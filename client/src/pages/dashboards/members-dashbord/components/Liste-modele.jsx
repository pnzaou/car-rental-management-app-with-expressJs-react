import axios from "axios"
import PropTypes from "prop-types" 
import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

const ListeModele = ({id}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchItem, setSearchItem] = useState("")
    const modsParpage = 5

    const {data: dataMod, isLoading: loadingMod, isError: errorMod} = useQuery("modeleData", async () => {

        const rep = await axios.get(`http://localhost:5000/api/modeles/${id}`)

        return rep.data
    })

    const lastMod = currentPage * modsParpage
    const firstMod = lastMod - modsParpage

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if(loadingMod) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    if(errorMod) {
        return (
            <div className="text-center text-red-500">
                <h1>Erreur lors du chargement des données</h1>
            </div>
        )
    }

    const filterMods = () => {
        if(dataMod?.data) {
          return searchItem.length >= 2 ? dataMod.data.filter(cat => cat.nom.toLowerCase().includes(searchItem.toLowerCase())) : dataMod.data
        }
      }

    const totalPages = dataMod?.data ? Math.ceil(dataMod.data.length / modsParpage) : 1

    return (
        <div className="mt-12 overflow-x-auto flex justify-center">
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
                    {filterMods()?.slice(firstMod, lastMod).map((cat) => (
                        <tr key={cat._id} className="hover">
                        <td>{cat.nom}</td>
                        <td>
                            {cat.description.length > 70
                            ? cat.description.substring(0, 70) + " ..."
                            : cat.description}
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

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <nav className="btn-group">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`btn ${currentPage === 1 ? "btn-disabled" : ""} btn-sm mr-2`}
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
                        } btn-sm mr-1`}
                        >
                        {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`btn ${
                        currentPage === totalPages ? "btn-disabled" : ""
                        } btn-sm ml-2`}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default ListeModele

ListeModele.propTypes = {
    id: PropTypes.string
}
