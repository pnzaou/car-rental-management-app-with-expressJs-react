import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

const DetailsMarques = () => {

    const {id} = useParams()

    const {data: dataMod, isLoading: loadingMod, isError: errorMod} = useQuery("modeleData", async () => {

        const rep = await axios.get(`http://localhost:5000/api/modeles/${id}`)

        return rep.data
    })

    const {data, isLoading, isError, isFetched} = useQuery("marqueData", async () => {
        const rep = await axios.get(`http://localhost:5000/api/marque/${id}`)

        return rep.data
    },{
        onSuccess: (data) => {
            if(!isFetched) {
                toast.success(data.message, {
                    position: "bottom-right"
                })
            }
        }
    })

    if(isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    if(isError) {
        return (
            <div className="text-center text-red-500">
                <h1>Erreur lors du chargement des données</h1>
            </div>
        )
    }

    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/members-dashboard">Tableau de bord</Link></li>
                    <li><Link to="/members-dashboard/marques">Liste des marques</Link></li>
                    <li>Détails</li>
                </ul>
            </div>
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>Détails de la marque</h1>
            </div>
            <div>
                <h3>Les modèles liés à la marque {data?.data.nom}</h3>
                {loadingMod? 
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                    : 
                    errorMod ?
                        <div className="text-center text-red-500">
                            <h1>Erreur lors du chargement des données</h1>
                        </div>
                        :
                        <div className="mt-16 overflow-x-auto flex justify-center">
                            <div>
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataMod?.data?.map((cat) => (
                                        <tr key={cat._id} className="hover">
                                        <td>{cat.nom}</td>
                                        <td>
                                            {cat.description.length > 70
                                            ? cat.description.substring(0, 70) + " ..."
                                            : cat.description}
                                        </td>
                                        <td>
                                            <Link
                                            to={`/members-dashboard/categories/modification/${cat._id}`}
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
                    </div>
                }
            </div>
        </div>
    );
}

export default DetailsMarques
