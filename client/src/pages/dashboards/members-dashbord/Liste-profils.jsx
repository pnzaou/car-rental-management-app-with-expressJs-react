import { useContext } from "react"
import useFetchData from "../../../hooks/useFetchData"
import TokenContext from "../../../contexts/token.context"
import DataWrapper from "../../../components/DataWrapper"
import usePaginatedFilter from "../../../hooks/usePaginatedFilter"
import Pagination from "../../../components/Pagination"
import ProfilForm from "./components/Profil-form"


const ListeProfils = () => {
    const proParPage = 5
    const queryKey = "profilData"
    const url = "http://localhost:5000/api/profils"
    const {token} = useContext(TokenContext)

    const {data, isLoading, isError, refetch} = useFetchData(queryKey, url, token)

    const {
        currentPage,
        handlePageChange,
        paginatedData,
        searchItem,
        setSearchItem,
        totalPages
    } = usePaginatedFilter(data?.data, "nom", proParPage)
  return (
    <div>
        <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
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
                        <td><button className="btn btn-sm btn-error">Supprimer</button></td>
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
