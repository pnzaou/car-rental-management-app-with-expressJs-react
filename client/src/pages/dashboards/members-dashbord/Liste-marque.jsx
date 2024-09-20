import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import useFetchData from "../../../hooks/useFetchData"
import TokenContext from "../../../contexts/token.context"
import usePaginatedFilter from "../../../hooks/usePaginatedFilter"
import Pagination from "../../../components/Pagination"
import DataWrapper from "../../../components/DataWrapper"
import useDeleteItem from "../../../hooks/useDeleteItem"

const ListeMarque = () => {
  const [idMarque, setIdMarque] = useState("")
  const marParPage = 5
  const queryKey = "marqueData"
  const {token} = useContext(TokenContext)
  const url = "http://localhost:5000/api/marques"
  const supUrl = "http://localhost:5000/api/marque"

  const {data, isError, isLoading, refetch} = useFetchData(queryKey, url, token)

  const {
    currentPage,
    handlePageChange,
    paginatedData,
    searchItem,
    setCurrentPage,
    setSearchItem,
    totalPages
  } = usePaginatedFilter(data?.data, "nom", marParPage)

  const {deleteItem, hiddenAlert, showAlert} = useDeleteItem(token, refetch, setCurrentPage, marParPage)

  return (
    <div>
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
          <span>La suppression de la marque entrainera celle des modèles qui lui sont ratachés et éventuellement celle des voitures liées à ces modèles ! Voulez-vous vraiment supprimer ?</span>
          <div>
            <button className="btn btn-sm mr-2" onClick={() => hiddenAlert(setIdMarque)}>Annuler</button>
            <button className="btn btn-sm btn-primary" onClick={() => deleteItem(idMarque, supUrl, setIdMarque)}>Oui</button>
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
                  <th>Marque</th>
                  <th>Pays d&apos;origine</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {paginatedData.map(mar => (
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
                    <button className="btn btn-error btn-sm" onClick={() => showAlert(mar._id, setIdMarque)}>Supprimer</button>
                  </th>
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

export default ListeMarque