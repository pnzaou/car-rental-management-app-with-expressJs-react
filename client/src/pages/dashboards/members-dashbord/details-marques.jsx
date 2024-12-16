import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import ListeModele from './components/Liste-modele'
import EditMarqueForm from './components/Edit-marque-form'
import { useContext } from 'react'
import TokenContext from '../../../contexts/token.context'

const DetailsMarques = () => {
    const {id} = useParams()
    const {token} = useContext(TokenContext)

    const {data, isLoading, error, isFetched, refetch} = useQuery("marqueData", async () => {
        const rep = await axios.get(`http://localhost:5000/api/marque/${id}`,{
            headers: {
                Authorization: token
            }
        })

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

    if(error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center text-red-500">
                <h1>Erreur lors du chargement des données</h1>
                <button onClick={refetch} className="btn btn-primary mt-4">
                    Réessayer
                </button>
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
            <div className="mt-11">
                <EditMarqueForm marData={data}/>
            </div>
            <div className='mt-11'>
                <h3>Les modèles liés à la marque {data?.data.nom}</h3>
                <ListeModele id={id}/>
            </div>
        </div>
    );
}

export default DetailsMarques
