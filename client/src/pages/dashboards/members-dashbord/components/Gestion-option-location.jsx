import { useContext, useState } from 'react';
import TokenContext from '../../../../contexts/token.context';
import useFetchData from '../../../../hooks/useFetchData';
import useDeleteItem from '../../../../hooks/useDeleteItem';
import usePaginatedFilter from '../../../../hooks/usePaginatedFilter';
import Pagination from '../../../../components/Pagination';
import DataWrapper from '../../../../components/DataWrapper';

const GestionOptionLocation = () => {
    const [id, setId] = useState("")
    const {token} = useContext(TokenContext)
    const itemsParPage = 4
    const url = "http://localhost:5000/api/options"
    const supUrl = "http://localhost:5000/api/option"

    const {
        data: OLData, 
        isLoading: OLLoading, 
        isError: OLError,
        refetch: OLRefetch
    } = useFetchData("OLData", url, token)
    const {
        currentPage: OLCurrentPage,
        handlePageChange: OLHandlePageChange,
        paginatedData: OLPaginatedData,
        searchItem: OLSearchItem,
        setCurrentPage: OLSetCurrentPage,
        setSearchItem: OLSetSearchItem,
        totalPages: OLTotalPages
    } = usePaginatedFilter(OLData?.data, "nom", itemsParPage)

    const {deleteItem, showAlert, hiddenAlert} = useDeleteItem(token, OLRefetch, OLSetCurrentPage)
    return (
        <div>
            <DataWrapper isLoading={OLLoading} isError={OLError} onRetry={OLRefetch}>
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
                    <button className="btn btn-sm mr-2" onClick={() => hiddenAlert(setId)}>Annuler</button>
                    <button className="btn btn-sm btn-primary" onClick={() => deleteItem(id, supUrl, setId)}>Oui</button>
                    </div>
                </div>
                <div className="text-center my-12">
                    <h1 className="text-2xl font-bold">Liste des Options de location</h1>
                </div>
                <div className="overflow-x-auto flex justify-center">
                    <div>
                        <div className="form-control mb-10 px-48">
                            <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Rechercher..." value={OLSearchItem} onChange={(e) => OLSetSearchItem(e.target.value)}/>
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
                                <th>Option</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {OLPaginatedData.map((UT) => (
                                <tr key={UT._id} className="hover">
                                <td>{UT.nom}</td>
                                <td>
                                    <button className="btn btn-accent btn-sm mr-2">Modifier</button>
                                    <button className="btn btn-error btn-sm" onClick={() => showAlert(UT._id, setId)}>Supprimer</button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination currentPage={OLCurrentPage} totalPages={OLTotalPages} onPageChange={OLHandlePageChange}/>
            </DataWrapper>
        </div>
    );
}

export default GestionOptionLocation;
