import { useContext, useState } from 'react'
import { useQuery } from "react-query"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import TokenContext from "../../../contexts/token.context"

const ListeCategorie = () => {
    const [currentPage, setCurrentPage] =useState(1)
    const [idCat, setIdCat] = useState("")
    const catsParPage = 5
    const {token} = useContext(TokenContext)

    const lastCat = currentPage * catsParPage
    const firstCat = lastCat - catsParPage

    const {data, error, isLoading, isFetched, refetch} = useQuery('catData', async () => {
        const rep = await axios.get("http://localhost:5000/api/categories",{
          headers: {
            Authorization: token 
          }
        })
        return rep.data
    }, {
        onSuccess: (data) => {
            if(!isFetched) {
                toast.success(`${data.message}`,{
                    position: 'bottom-right'
                })
            }
        }
    })

    const totalPages = data?.data ? Math.ceil(data.data.length / catsParPage) : 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
      

    if(isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    if (error) {
        return (
            <div className="text-center text-red-500">
                <h1>Erreur lors du chargement des données</h1>
            </div>
        );
    }

    const deleteCat = async (id) => {
        try {
            const rep = await axios.delete(`http://localhost:5000/api/categorie/${id}`, {
              headers: {
                  Authorization: token
              }
          })
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
            document.querySelector(".alert-error").classList.add("hidden")
            setIdCat("")
            refetch()
            setCurrentPage(Math.ceil((data.data.length - 1) / catsParPage))
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    const showAlert = (id) => {
      document.querySelector(".alert-error").classList.remove("hidden")
      setIdCat(id)
    }
  
    const hiddenAlert = () => {
      document.querySelector(".alert-error").classList.add("hidden")
      setIdCat("")
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
          <span>Voulez-vous vraiment supprimer ?</span>
          <div>
            <button className="btn btn-sm mr-2" onClick={hiddenAlert}>Annuler</button>
            <button className="btn btn-sm btn-primary" onClick={() => deleteCat(idCat)}>Oui</button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Liste des catégories</h1>
        </div>
        <div>
            <Link className="btn btn-accent absolute" to="/members-dashboard/categories/ajout">Ajouter</Link>
        </div>
        <div className="mt-16 overflow-x-auto flex justify-center">
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.slice(firstCat, lastCat).map((cat) => (
                  <tr key={cat._id} className="hover">
                    <td>{cat.nom}</td>
                    <td>
                      {cat.description.length > 70
                        ? cat.description.substring(0, 70) + " ..."
                        : cat.description}
                    </td>
                    <td>
                      <Link
                        to={`/members-dashboard/categories/modification/${cat._id}`}
                        className="btn btn-accent btn-sm mr-2"
                      >
                        Détails
                      </Link>
                      <button className="btn btn-error btn-sm" onClick={() => showAlert(cat._id)}>Supprimer</button>
                    </td>
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

export default ListeCategorie
