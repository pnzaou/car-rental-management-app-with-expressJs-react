import { useContext } from "react";
import useFetchData from "../../../hooks/useFetchData";
import TokenContext from "../../../contexts/token.context";
import DataWrapper from "../../../components/DataWrapper";
import usePaginatedFilter from "../../../hooks/usePaginatedFilter";
import Pagination from "../../../components/Pagination";


const GestionUnitSTarificationOptionsLocation = () => {
    const {token} = useContext(TokenContext)
    const itemsParPage = 4
    const UTUrl = "http://localhost:5000/api/unites"
    const OLUrl = "http://localhost:5000/api/options"
    const {
        data: UTData, 
        isLoading: UTLoading, 
        isError: UTError, 
        refetch: UTRefetch
    } = useFetchData("UTData", UTUrl, token)
    const {
        data: OLData, 
        isLoading: OLLoading, 
        isError: OLError,
        refetch: OLRefetch
    } = useFetchData("OLData", OLUrl, token)
    const {
        currentPage: UTCurrentPage,
        handlePageChange: UTHandlePageChange,
        paginatedData: UTPaginatedData,
        searchItem: UTSearchItem,
        setCurrentPage: UTSetCurrentPage,
        setSearchItem: UTSetSearchItem,
        totalPages: UTTotalPages
    } = usePaginatedFilter(UTData?.data, "nom", itemsParPage)
    const {
        currentPage: OLCurrentPage,
        handlePageChange: OLHandlePageChange,
        paginatedData: OLPaginatedData,
        searchItem: OLSearchItem,
        setCurrentPage: OLSetCurrentPage,
        setSearchItem: OLSetSearchItem,
        totalPages: OLTotalPages
    } = usePaginatedFilter(OLData?.data, "nom", itemsParPage)

    return (
        <div>
            <DataWrapper isLoading={UTLoading} isError={UTError} onRetry={UTRefetch}>
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold">Liste des Unités de tarification</h1>
                </div>
                <div className="overflow-x-auto flex justify-center">
                    <div>
                        <div className="form-control mb-10 px-48">
                            <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Rechercher..." value={UTSearchItem} onChange={(e) => UTSetSearchItem(e.target.value)}/>
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
                                <th>Unité</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {UTPaginatedData.map((UT) => (
                                <tr key={UT._id} className="hover">
                                <td>{UT.nom}</td>
                                <td>
                                    <button className="btn btn-accent btn-sm mr-2">Modifier</button>
                                    <button className="btn btn-error btn-sm">Supprimer</button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination currentPage={UTCurrentPage} totalPages={UTTotalPages} onPageChange={UTHandlePageChange}/>
            </DataWrapper>
            <DataWrapper isLoading={OLLoading} isError={OLError} onRetry={OLRefetch}>
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
                                    <button className="btn btn-error btn-sm">Supprimer</button>
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

export default GestionUnitSTarificationOptionsLocation;
