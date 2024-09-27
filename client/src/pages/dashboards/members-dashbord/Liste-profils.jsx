import { useContext, useState } from "react"
import useFetchData from "../../../hooks/useFetchData"
import TokenContext from "../../../contexts/token.context"
import DataWrapper from "../../../components/DataWrapper"
import usePaginatedFilter from "../../../hooks/usePaginatedFilter"
import Pagination from "../../../components/Pagination"
import ProfilForm from "./components/Profil-form"
import useDeleteItem from "../../../hooks/useDeleteItem"


const ListeProfils = () => {
    const [profilId, setProfilId] = useState("")
    const proParPage = 5
    const queryKey = "profilData"
    const url = "http://localhost:5000/api/profils"
    const supUrl = "http://localhost:5000/api/profil"
    const {token} = useContext(TokenContext)

    const {data, isLoading, isError, refetch} = useFetchData(queryKey, url, token)

    const {
        currentPage,
        handlePageChange,
        paginatedData,
        searchItem,
        setSearchItem,
        setCurrentPage,
        totalPages
    } = usePaginatedFilter(data?.data, "nom", proParPage)

    const {showAlert, deleteItem, hiddenAlert} = useDeleteItem(token, refetch, setCurrentPage, proParPage)

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
                <span>Voulez-vous vraiment supprimer ?</span>
                <div>
                <button className="btn btn-sm mr-2" onClick={() => hiddenAlert(setProfilId)}>Annuler</button>
                <button className="btn btn-sm btn-primary" onClick={() => deleteItem(profilId, supUrl, setProfilId)}>Oui</button>
                </div>
            </div>
            <div className="w-full max-w-4xl p-6 bg-base-100 rounded-box shadow-md mb-16">
                <ProfilForm totalPages={totalPages} handlePageChange={handlePageChange} refetch={refetch}/>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Liste des profils</h1>
                </div>
                <div className="overflow-x-auto mt-7">
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
                        <th>Autorisation</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedData.map(profil => (
                        <tr className="bg-base-200" key={profil._id}>
                            <td>{profil.nom}</td>
                            <td><button className="btn btn-sm btn-accent">Modifier</button></td>
                            <td><button className="btn btn-sm btn-error" onClick={() => showAlert(profil._id, setProfilId)}>Supprimer</button></td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>

          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </DataWrapper>
    </div>
  )
}

export default ListeProfils
