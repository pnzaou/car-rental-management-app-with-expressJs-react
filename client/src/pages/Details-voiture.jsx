import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../components/Header";
import DetailsHeader from "../components/Details-header";
import VoitureDetailsImages from "../components/Voiture-details-images";
import VoitureDetailsDescription from "../components/Voiture-details-description";
import VoitureDetailsFeatures from "../components/Voiture-details-features";
import VoitureDetailsPrix from "../components/voiture-details-prix";

const DetailsVoiture = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [checkedOptions, setCheckedOptions] = useState([])
    const [pulse, setPulse] = useState(false)

    const {data, isLoading, isError, refetch} = useQuery("voituresDetails", async () => {
        const rep = await axios.get(`http://localhost:5000/api/public/voiture/${id}`)
        return rep.data.data;
    })

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

    const handeleCheckboxChange = (optionId, tarifOption, volId, optionNom, isChecked) => {
        if (isChecked) {
            setCheckedOptions([...checkedOptions, {optionId, optionNom, tarifOption, volId}])
            if(pulse) {
                setPulse(false)
            }
        } else {
            checkedOptions.filter((option) => option.optionId !== optionId)
        }
    }

    const handleAction = () => {
        if (checkedOptions.length > 0) {
            navigate(`/passer-réservation/${id}?options=${checkedOptions.map(option => JSON.stringify(option)).join(", ")}`)
        } else {
            document.getElementById('my_modal_1').showModal()
            setPulse(true)
        }
    };


    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="
                        py-4 
                        pop-up-options-lg:after:content-['_Rendez_vous_en_bas_de_la_page']
                        pop-up-options-sm:after:content-['_Rendez_vous_à_la_section_au_dessus']
                    ">
                        Des options de locations sont disponibles pour rendre votre expérience inoubliable.
                    </p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-sky-700 text-white">Ajouter des options</button>
                    </form>
                    <button className="btn btn-error" onClick={() =>  navigate(`/passer-réservation/${id}`)}>Non merci</button>
                    </div>
                </div>
            </dialog>
            <Header/>
            <div className="p-10 md:px-20">
                <DetailsHeader data={data}/>

                <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
                    <div className="md:col-span-2">
                        <VoitureDetailsImages data={data}/>
                        <VoitureDetailsDescription data={data}/>
                        <VoitureDetailsFeatures data={data} handeleCheckboxChange={handeleCheckboxChange} pulse={pulse}/>
                    </div>
                    <div className="">
                        <VoitureDetailsPrix data={data} handleAction={handleAction}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsVoiture;
