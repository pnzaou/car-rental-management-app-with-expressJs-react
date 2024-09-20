import PropTypes from "prop-types" 
import { useContext } from "react"
import { Link } from "react-router-dom"
import TokenContext from "../../../../contexts/token.context"
import useFetchData from "../../../../hooks/useFetchData"
import usePaginatedFilter from "../../../../hooks/usePaginatedFilter"
import Pagination from "../../../../components/Pagination"
import DataWrapper from "../../../../components/DataWrapper"

const ListeModele = ({id}) => {
    const modsParpage = 5
    const url = `http://localhost:5000/api/modeles/${id}`
    const {token} = useContext(TokenContext)
    const queryKey = "modeleData"

    const {data, isLoading, isError, refetch} = useFetchData(queryKey, url, token)

    const {
        currentPage,
        handlePageChange,
        paginatedData,
        searchItem,
        setCurrentPage,
        setSearchItem,
        totalPages
    } = usePaginatedFilter(data?.data, "nom", modsParpage)

    return (
        <div className="mt-12 overflow-x-auto flex justify-center">
            <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
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
                            <th>Modèles</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData.map(mod => (
                            <tr key={mod._id} className="hover">
                            <td>{mod.nom}</td>
                            <td>
                                {mod.description.length > 70
                                ? mod.description.substring(0, 70) + " ..."
                                : mod.description}
                            </td>
                            <td>
                                <Link
                                to={`/members-dashboard/`}
                                className="btn btn-accent btn-sm mr-2"
                                >
                                Détails
                                </Link>
                                <button
                                className="btn btn-error btn-sm"
                                onClick={() => {}}
                                >
                                Supprimer
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            </DataWrapper>
        </div>
    )
}

export default ListeModele

ListeModele.propTypes = {
    id: PropTypes.string
}
