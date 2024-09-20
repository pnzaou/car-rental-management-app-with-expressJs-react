import { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import TokenContext from "../../../contexts/token.context"
import useFetchData from '../../../hooks/useFetchData'
import usePaginatedFilter from '../../../hooks/usePaginatedFilter'
import Pagination from '../../../components/Pagination'
import DataWrapper from '../../../components/DataWrapper'

const ListeCategorie = () => {
  const [idCat, setIdCat] = useState("") 
  const catsParPage = 5
  const queryKey = "catData"
  const {token} = useContext(TokenContext)
  const url = "http://localhost:5000/api/categories"

  const {data, isError, isLoading, refetch} = useFetchData(queryKey, url, token)

  const {
    currentPage,
    handlePageChange,
    paginatedData,
    searchItem,
    setSearchItem,
    totalPages,
    setCurrentPage
  } = usePaginatedFilter(data?.data, "nom", catsParPage)

    //suppression d'une categorie
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
            setCurrentPage(Math.ceil((data?.data.length - 1) / catsParPage))
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    //affichage de l'arlete supression
    const showAlert = (id) => {
      document.querySelector(".alert-error").classList.remove("hidden")
      setIdCat(id)
    }
  
    //masquer l'alerte supression
    const hiddenAlert = () => {
      document.querySelector(".alert-error").classList.add("hidden")
      setIdCat("")
    }

    return (
      <div>
        {/* Alert de suppression */}
        <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
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
              <Link className="btn btn-accent btn-sm absolute" to="/members-dashboard/categories/ajout">Ajouter</Link>
          </div>

          <div className="mt-16 overflow-x-auto flex justify-center">
            <div>
              {/* Inupt de recherche */}
              <div className="form-control mb-10 px-48">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Rechercher..." value={searchItem} onChange={(e) => setSearchItem(e.target.value)}/>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                </label>
              </div>

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
                  {paginatedData.map((cat) => (
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

          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </DataWrapper>
      </div>
    );
}

export default ListeCategorie
