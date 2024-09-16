import { Link } from "react-router-dom"
import { useQuery } from "react-query"  
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"


const ListeMarque = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [idMarque, setIdMarque] = useState("")
  const marParPage = 5

  const {data, isLoading, error, isFetched, refetch} = useQuery("marData", async () => {
    const rep = await axios.get("http://localhost:5000/api/marques")
    
    return rep.data
  }, {
    onSuccess: (data) => {
      if(!isFetched) {
        toast.success(data.message, {
          position: "bottom-right"
        })
      }
    }
  })

  if(isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  const lastMar = currentPage * marParPage
  const firstMar = lastMar - marParPage

  const totalPages = data?.data ? Math.ceil(data.data.length / marParPage) : 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  if (error) {
    return (
        <div className="text-center text-red-500">
            <h1>Erreur lors du chargement des données</h1>
        </div>
    );
  }

  const deleteMarque = async (id) => {
    try {
      const rep = await axios.delete(`http://localhost:5000/api/marque/${id}`)
      toast.success(rep.data.message, {
        position: "bottom-right"
    })
    document.querySelector(".alert-error").classList.add("hidden")
    setIdMarque("")
    refetch()
    setCurrentPage(Math.ceil((data.data.length - 1) / marParPage))
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right"
    })
    }
  }

  const showAlert = (id) => {
    document.querySelector(".alert-error").classList.remove("hidden")
    setIdMarque(id)
  }

  const hiddenAlert = () => {
    document.querySelector(".alert-error").classList.add("hidden")
    setIdMarque("")
  }

  return (
    <div>
      <div role="alert" className="alert alert-error hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>La suppression de la marque entrainera celle des modèles qui lui sont ratachés et éventuellement celle des voitures liées à ces modèles ! Voulez-vous vraiment supprimer ?</span>
        <div>
          <button className="btn btn-sm mr-2" onClick={hiddenAlert}>Annuler</button>
          <button className="btn btn-sm btn-primary" onClick={() => deleteMarque(idMarque)}>Oui</button>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Liste des marques</h1>
      </div>
      <div>
        <Link
          className="btn btn-accent absolute"
          to="/members-dashboard/marques/ajout"
        >
          Ajouter
        </Link>
      </div>
      <div className="mt-16 overflow-x-auto flex justify-center">
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Marque</th>
                <th>Pays d&apos;origine</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.data?.slice(firstMar, lastMar).map(mar => (
                <tr key={mar._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`${mar.logo}`}
                          alt="Logo de la marque"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{mar.nom}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {mar.paysDorigine}
                </td>
                <th>
                  <Link to={`/members-dashboard/marques/details/${mar._id}`} className="btn btn-accent btn-sm mr-4">Détails</Link>
                  <button className="btn btn-error btn-sm" onClick={() => showAlert(mar._id)}>Supprimer</button>
                </th>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <nav className="btn-group">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`btn ${currentPage === 1 ? "btn-disabled" : ""} btn-sm mr-2`}
                disabled={currentPage === 1}
              >
                Précédent
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-active" : ""
                  } btn-sm mr-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`btn ${
                  currentPage === totalPages ? "btn-disabled" : ""
                } btn-sm ml-2`}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
    </div>
  );
}

export default ListeMarque