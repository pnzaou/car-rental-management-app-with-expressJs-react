import { useContext, useEffect, useState } from "react"
import useFetchData from "../../../hooks/useFetchData"
import TokenContext from "../../../contexts/token.context"
import usePaginatedFilter from "../../../hooks/usePaginatedFilter"
import DataWrapper from "../../../components/DataWrapper"
import Pagination from "../../../components/Pagination"
import axios from "axios"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const ListeUsers = () => {
  const userParPage = 5
  const url = "http://localhost:5000/api/users"
  const { token } = useContext(TokenContext)
  const queryKey = "usersData"
  const { data, isLoading, isError, refetch } = useFetchData(queryKey, url, token)
  const [profils, setProfils] = useState({})

  const {
    currentPage,
    handlePageChange,
    paginatedData,
    searchItem,
    setCurrentPage,
    setSearchItem,
    totalPages
  } = usePaginatedFilter(data?.data, "nom", userParPage)

  const getUserProfil = async (id) => {
    try {
      const rep = await axios.get(`http://localhost:5000/api/profil/nom/${id}`, {
        headers: {
          Authorization: token
        }
      })
      return rep.data.data.nom// Utilise rep.data.data.nom comme renvoyé par l'API
    } catch (error) {
      console.log(error)
      return "Erreur"
    }
  }

  useEffect(() => {
    const fetchProfils = async () => {
      const newProfils = {}
      for (let user of paginatedData) {
        console.log("user", user);
        const profil = await getUserProfil(user.profilId)
        newProfils[user._id] = profil
        console.log("newProfil", newProfils);
      }
      setProfils(newProfils)
    }

    if (paginatedData.length > 0) {
      fetchProfils()
    }
  }, [paginatedData])

  const toggleUserState = async (id) => {
    try {
      const rep = await axios.patch(`http://localhost:5000/api/user/${id}`, null, {
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
            <Link className="btn btn-accent btn-sm absolute" to="/members-dashboard/settings/utilisateurs/ajout">Ajouter</Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Liste des utilisateurs</h1>
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
                  <td>Rôle</td>
                  <td>Créé le</td>
                  <td>Statut</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(user => (
                  <tr className="hover" key={user._id}>
                    <th>{`${user.prenom} ${user.nom}`}</th>
                    <td>{profils[user._id] || "Chargement..."}</td>
                    <td>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</td>
                    <td>
                      <div className={`badge badge-${user.etat ? "success" : "error"}`}>
                        {user.etat ? "actif" : "bloqué"}
                      </div>
                    </td>
                    <td>
                      <Link
                        className="btn btn-success btn-sm mr-2"
                      >
                        Détails
                      </Link>
                      <button className="btn btn-accent btn-sm mr-2" onClick={
                        () => toggleUserState(user._id)
                      }>
                        {`${user.etat? "Bloquer" : "Débloquer"}`}
                      </button>
                      <button className="btn btn-error btn-sm">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </DataWrapper>
    </div>
  )
}

export default ListeUsers
