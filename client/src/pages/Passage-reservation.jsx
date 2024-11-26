import { useContext, useState } from "react"
import {useParams} from "react-router-dom"
import {useQuery} from "react-query"
import axios from "axios"
import Header from "../components/Header"
import Calendar  from "react-calendar"
import "react-calendar/dist/Calendar.css"
import TokenContext from "../contexts/token.context"
import { reservationDescription } from "../services"

const PassageReservation = () => {
    const {token} = useContext(TokenContext)
    const [options, setOptions] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search).get('options');
        return urlParams ? urlParams.split(", ").map(option => JSON.parse(option)) : []
    })    
    const [montantTotal, setMontantTotal] = useState(() => {
        return options.length > 0 
            ? options.reduce((acc, cur) => acc + cur.tarifOption, 0) 
            : 0;
    });
    const [dates, setDates] = useState([])
    const [nbrJours, setNbrJours] = useState(0)
    const [montantParJours, setMontantParJours] = useState(0)
    const [btnState, setBtnState] = useState(true)

    const {id} = useParams()

    const {data, isLoading, isError, refetch} = useQuery("voituresDetailsRes", async () => {
        const rep = await axios.get(`http://localhost:5000/api/public/voiture/${id}`)
        return rep.data.data;
    })

    const handleDateChange = (datesSelectionnees) => {
        setDates(datesSelectionnees)
        if(datesSelectionnees.length === 2){
            const diffTime = datesSelectionnees[1] - datesSelectionnees[0]
            const jours = Math.floor(diffTime / (1000 * 3600 * 24)) + 1
            const montant = jours * data?.tarif[0].tarifLocation

            setNbrJours(jours)
            setMontantParJours(montant)
            
            const optionsTotal = options.reduce((acc, cur) => acc + cur.tarifOption, 0)
            setMontantTotal(optionsTotal + montant)

            setBtnState(jours < 3)
        }
    }

    const handleReservationPayment = async () => {
        const VOL = options.map(op => JSON.stringify(op)).join(", ")
        const VUT = JSON.stringify({
            VUTId: data?.tarif[0]._id,
            nbrVUT: nbrJours,
            prix: montantParJours
        })
        const rep = await axios.post('http://localhost:5000/api/reservations', {
            item_name: `Location ${data?.modele.nom}`,
            dateDebut: dates[0],
            dateFin: dates[1],
            montantTotal,
            VUT,
            VOL,
            command_name: reservationDescription(options, data)
        },{headers: {Authorization: token}})
    }

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
            <div className="mt-16 px-10">
                <div className="pt-5">
                    <h1 className="font-semibold text-gray-700">Vous allez réserver le {data?.modele.nom} à {data?.tarif[0].tarifLocation} XOF la journée</h1>
                </div>
                <div className="mt-10">
                    <div>
                        <p className="">Choisissez les dates de début et de fin pour votre location (Minimum 3 jours)<span className="text-[crimson]">*</span>.</p>
                    </div>
                    <div className="mt-5">
                        <Calendar
                            selectRange
                            onChange={handleDateChange}
                            value={dates}
                            minDate={new Date()}
                            className="calendar"
                        />
                    </div>
                </div>
                <div className="mt-7">
                    <h2 className="font-semibold text-gray-700">Récapitulatif de votre réservation</h2>
                    <div className="mt-7 mb-10 p-4 shadow-sm rounded-lg">
                        {
                            options.length > 0?
                            <div>
                                <h3>Les options de location sélectionnées :</h3>
                                <ul className="mt-3">
                                    {options.map((op) => (
                                        <li key={op.optionId} className="flex justify-between">
                                            <span className="block">{op.optionNom} :</span>
                                            <span className="block font-semibold">{op.tarifOption} XOF</span>
                                        </li>
                                    ))}
                                </ul>
                            </div> : ""
                        }
                        <div className="mt-4 flex justify-between">
                            <span className="block">Location pour {nbrJours} jours :</span>
                            <span className="block font-semibold">{montantParJours} XOF</span>
                        </div>
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="mt-4 flex justify-between">
                            <span className="block">Montant total :</span>
                            <span className="block font-semibold">{montantTotal} XOF</span>
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button className="btn btn-wide bg-sky-700 text-white" onClick={handleReservationPayment} disabled={btnState}>Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PassageReservation;
