import { useParams } from "react-router-dom";
import Header from "../components/Header";
import DetailsHeader from "../components/Details-header";
import { useQuery } from "react-query";
import axios from "axios";
import VoitureDetailsImages from "../components/Voiture-details-images";
import VoitureDetailsDescription from "../components/Voiture-details-description";
import VoitureDetailsFeatures from "../components/Voiture-details-features";
import VoitureDetailsPrix from "../components/voiture-details-prix";

const DetailsVoiture = () => {
    const {id} = useParams()

    const {data, isLoading, isError, refetch} = useQuery("voituresDetails", async () => {
        const rep = await axios.get(`http://localhost:5000/api/public/voiture/${id}`)
        return rep.data.data;
    })

    //const {} = data

    if(isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <img src="/img/LOGO_LPCY.png" alt="logo du site" className='h-60 w-60 animate-bounce'/>
            </div>
        )
    }

    if(isError){
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
            <Header/>
            <div className="p-10 md:px-20">
                <DetailsHeader data={data}/>

                <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
                    <div className="md:col-span-2">
                        <VoitureDetailsImages data={data}/>
                        <VoitureDetailsDescription data={data}/>
                        <VoitureDetailsFeatures data={data}/>
                    </div>
                    <div className="">
                        <VoitureDetailsPrix data={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsVoiture;
