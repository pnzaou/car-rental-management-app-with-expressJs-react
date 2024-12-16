import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import TokenContext from "../../../contexts/token.context";
import axios from "axios";
import toast from "react-hot-toast";
import DetailsClientInfoSide from "./components/Details-client-info-side";
import DetailsClientImageSide from "./components/Details-client-image-side";

const ClientDetails = () => {
    const { token } = useContext(TokenContext);
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null); 

    const { data, isLoading, isFetched, error, refetch } = useQuery(
        ["clientDetailsData", id],
        async () => {
            const rep = await axios.get(`http://localhost:5000/api/client/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return rep.data;
        },
        {
            onSuccess: (data) => {
                if (!isFetched) {
                    toast.success(data.message, {
                        position: "bottom-right",
                    });
                }
            },
        }
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center text-red-500">
                <h1>Erreur lors du chargement des données</h1>
                <button onClick={refetch} className="btn btn-primary mt-4">
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="px-4">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <Link to="/members-dashboard">Tableau de bord</Link>
                    </li>
                    <li>
                        <Link to="/members-dashboard/clients">Liste des clients</Link>
                    </li>
                    <li>Détails</li>
                </ul>
            </div>
            <div className="mt-5 flex gap-8">
                {/* Informations du client */}
                <DetailsClientInfoSide data={data?.data}/>

                {/* Section des images */}
                <div className="w-1/2">
                    {/* Permis */}
                    <DetailsClientImageSide 
                        title="photo du permis" 
                        src={data.data?.photoPermis} 
                        onClick={() => setSelectedImage(data.data?.photoPermis)}
                    />
                    {/* CNI */}
                    <DetailsClientImageSide 
                        title="photo de la CNI" 
                        src={data.data?.photoCNI}
                        onClick={() => setSelectedImage(data.data?.photoCNI)}
                    />
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Agrandie" className="max-w-screen-md max-h-screen-md rounded-lg" />
                </div>
            )}
        </div>
    );
};

export default ClientDetails;
