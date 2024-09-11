import { useState } from 'react'
import { useQuery } from "react-query"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ListeCategorie = () => {
    const [currentPage, setCurrentPage] =useState(1)
    const catsParPage = 5

    const lastCat = currentPage * catsParPage
    const firstCat = lastCat - catsParPage

    const {data, error, isLoading, isFetched, refetch} = useQuery('catData', async () => {
        const rep = await axios.get("http://localhost:5000/api/categories")
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
            const rep = await axios.delete(`http://localhost:5000/api/categorie/${id}`)
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
            refetch()
            setCurrentPage(Math.ceil((data.data.length - 1) / catsParPage))
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Liste des catégories</h1>
        </div>
        <div>
            <Link className="btn btn-accent absolute" to="/members-dashboard/categories/ajout">Ajouter</Link>
        </div>
        <div className="mt-16 overflow-x-auto px-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
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
                      className="btn btn-accent mr-2"
                    >
                      Détails
                    </Link>
                    <button className="btn btn-error" onClick={() => deleteCat(cat._id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <nav className="btn-group">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
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
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`btn ${
                  currentPage === totalPages ? "btn-disabled" : ""
                }`}
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
