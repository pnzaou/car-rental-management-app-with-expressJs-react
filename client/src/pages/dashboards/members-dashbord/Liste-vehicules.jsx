import { useContext } from "react";
import useFetchData from "../../../hooks/useFetchData";
import TokenContext from "../../../contexts/token.context";
import usePaginatedFilter from "../../../hooks/usePaginatedFilter";
import DataWrapper from "../../../components/DataWrapper";
import { Link } from "react-router-dom";

const ListeVehicules = () => {
    const {token} = useContext(TokenContext)
    const url = "http://localhost:5000/api/voitures"
    const voitParPage = 5
    const {data, isError, isLoading, refetch} = useFetchData("vehiculesData", url, token)
    const {
        currentPage,
        handlePageChange,
        paginatedData,
        searchItem,
        setCurrentPage,
        setSearchItem,
        totalPages
    } = usePaginatedFilter(data?.data, "modele", voitParPage)
    return (
      <div>
        <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Liste des véhicules</h1>
          </div>
          <div>
            <Link
              className="btn btn-accent btn-sm absolute"
              to="/members-dashboard/vehicules/ajout"
            >
              Ajouter
            </Link>
          </div>
          <div className="mt-16 overflow-x-auto flex justify-center">
            <div>
              <div className="form-control mb-10 px-48">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Rechercher..."
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>

              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Modèle</th>
                    <th>Immatriculation</th>
                    <th>Type de carburant</th>
                    <th>Capacité d&apos;assise</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map(voiture => (
                    <tr key={voiture._id} className="hover">
                        <td>{voiture.modele}</td>
                        <td>{voiture.immatriculation ? voiture.immatriculation : "aucun"}</td>
                        <td>{voiture.typeCarburant}</td>
                        <td>{voiture.capaciteDassise} places</td>
                    </tr>
                  ))
                    /* {paginatedData.map((voiture) => (
                    <tr key={cat._id} className="hover">
                      <td>{cat.nom}</td>
                      <td>
                      </td>
                      <td>
                        <Link
                          to={`/members-dashboard/categories/modification/${cat._id}`}
                          className="btn btn-accent btn-sm mr-2"
                        >
                          Détails
                        </Link>
                        <button className="btn btn-error btn-sm" onClick={() => showAlert(cat._id, setIdCat)}>Supprimer</button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </DataWrapper>
      </div>
    );
}

export default ListeVehicules;
