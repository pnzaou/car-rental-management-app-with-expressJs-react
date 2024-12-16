import { useContext } from "react"
import useFetchData from "../../../hooks/useFetchData"
import TokenContext from "../../../contexts/token.context"
import usePaginatedFilter from "../../../hooks/usePaginatedFilter"
import DataWrapper from "../../../components/DataWrapper"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import Pagination from "../../../components/Pagination"
import axios from "axios"
import toast from "react-hot-toast"


const ListeClient = () => {
    const clientParPage = 5
    const url = "http://localhost:5000/api/clients"
    const { token } = useContext(TokenContext)
    const queryKey = "clientsData"
    const { data, isLoading, isError, refetch } = useFetchData(queryKey, url, token)

    const {
        currentPage,
        handlePageChange,
        paginatedData,
        searchItem,
        //setCurrentPage,
        setSearchItem,
        totalPages
      } = usePaginatedFilter(data?.data, "nom", clientParPage)

      const toggleClientState = async (id) => {
        try {
          const rep = await axios.patch(`http://localhost:5000/api/client/${id}`, null, {
            headers: {
              Authorization: token
            }
          })
          refetch()
          toast.success(rep.data.message, {
            position: "bottom-right"
          })
        } catch (error) {
          toast.error(error.response.data.message, {
            position: "bottom-right"
          })
        }
      }

    return (
        <div>
            <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
                <div className="w-full max-w-4xl p-6 bg-base-100 rounded-box shadow-md mb-16">
                    <div>
                        <Link className="btn btn-accent btn-sm absolute" to="/members-dashboard/clients/ajout">Ajouter</Link>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Liste des clients</h1>
                    </div>
                    <div className="overflow-x-auto mt-7">
                        <div className="form-control mb-10 px-48">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Rechercher..." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
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
                        <thead>
                            <tr>
                            <th>Nom complet</th>
                            <td>Créé le</td>
                            <td>Statut</td>
                            <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(client => (
                            <tr className="hover" key={client._id}>
                                <th>{`${client.prenom} ${client.nom}`}</th>
                                <td>{format(new Date(client.createdAt), 'dd/MM/yyyy')}</td>
                                <td>
                                <div className={`badge badge-${client.etat ? "success" : "error"}`}>
                                    {client.etat ? "actif" : "bloqué"}
                                </div>
                                </td>
                                <td>
                                <Link
                                    to={`/members-dashboard/clients/détails/${client._id}`}
                                    className="btn btn-success btn-sm mr-2"
                                >
                                    Détails
                                </Link>
                                <button className="btn btn-accent btn-sm mr-2" onClick={
                                    () => toggleClientState(client._id)
                                }>
                                    {`${client.etat? "Bloquer" : "Débloquer"}`}
                                </button>
                                <button className="btn btn-error btn-sm">Supprimer</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </DataWrapper>
        </div>
    );
}

export default ListeClient;
