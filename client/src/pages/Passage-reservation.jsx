import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {toast} from "react-hot-toast"
import axios from "axios";
import Header from "../components/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TokenContext from "../contexts/token.context";
import { reservationDescription } from "../services";

const PassageReservation = () => {
  const { token } = useContext(TokenContext);

  const [options, setOptions] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search).get("options");
    return urlParams ? urlParams.split(", ").map((option) => JSON.parse(option)) : [];
  });

  const [montantTotal, setMontantTotal] = useState(0);
  const [dates, setDates] = useState([]);
  const [nbrJours, setNbrJours] = useState(0);
  const [montantParJours, setMontantParJours] = useState(0);
  const [btnState, setBtnState] = useState(true);

  const [loadingPay, setLoadingPay] = useState(false)
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(""); 

  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useQuery("voituresDetailsRes", async () => {
    const rep = await axios.get(`http://localhost:5000/api/public/voiture/${id}`);
    return rep.data.data;
  });

  const handleDateChange = (datesSelectionnees) => {
    if (!data?.tarif || !data?.tarif[0]) return;

    setDates(datesSelectionnees);

    if (datesSelectionnees.length === 2) {
      const diffTime = datesSelectionnees[1] - datesSelectionnees[0];
      const jours = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;

      const montant = jours * data.tarif[0].tarifLocation;

      setNbrJours(jours);
      setMontantParJours(montant);

      const optionsTotal = options.reduce((acc, cur) => acc + cur.tarifOption, 0);
      setMontantTotal(optionsTotal + montant);

      setBtnState(jours < 3);
    }
  };

  const handleReservationPayment = async () => {
    setLoadingPay(true)
    try {
      const VOL = options.map((op) => JSON.stringify(op)).join(", ");
      const VUT = JSON.stringify({
        VUTId: data?.tarif[0]._id,
        nbrVUT: nbrJours,
        prix: montantParJours,
      });

      const rep = await axios.post(
        "http://localhost:5000/api/reservations",
        {
          item_name: `Location ${data?.modele.nom}`,
          dateDebut: dates[0]?.toISOString().split("T")[0],
          dateFin: dates[1]?.toISOString().split("T")[0],
          montantTotal,
          VUT,
          VOL,
          command_name: reservationDescription(options, data),
        },
        { headers: { Authorization: token } }
      );
      setLoadingPay(false)

      if (rep.data.success) {
        setModalMessage(rep.data.message);
        setRedirectUrl(rep.data.redirect_url);
        setShowModal(true);
      }
    } catch (error) {
        setLoadingPay(false)
        toast.error(
            error.response?.data?.message 
              ? error.response.data.message 
              : "Une erreur s'est produite, veuillez réessayer."
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/img/LOGO_LPCY.png" alt="logo du site" className="h-60 w-60 animate-bounce" />
      </div>
    );
  }

  if(loadingPay) {
    return (
        <div className="flex items-center justify-center h-screen">
          <img src="/img/LOGO_LPCY.png" alt="logo du site" className="h-60 w-60 animate-bounce" />
        </div>
      );
  }

  if (isError) {
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
    <div>
      <Header />
      <div className="mt-16 px-10">
        <div className="pt-5">
          <h1 className="font-semibold text-gray-700">
            Vous allez réserver le {data?.modele.nom} à {data?.tarif[0]?.tarifLocation} XOF la journée
          </h1>
        </div>
        <div className="mt-10">
          <p>
            Choisissez les dates de début et de fin pour votre location (Minimum 3 jours)
            <span className="text-[crimson]">*</span>.
          </p>
          <Calendar
            selectRange
            onChange={handleDateChange}
            value={dates}
            minDate={new Date()}
            className="calendar mt-5"
          />
        </div>

        <div className="mt-7">
          <h2 className="font-semibold text-gray-700">Récapitulatif de votre réservation</h2>
          <div className="mt-7 mb-10 p-4 shadow-sm rounded-lg">
            {options.length > 0 && (
              <div>
                <h3>Les options de location sélectionnées :</h3>
                <ul className="mt-3">
                  {options.map((op) => (
                    <li key={op.optionId} className="flex justify-between">
                      <span>{op.optionNom} :</span>
                      <span className="font-semibold">{op.tarifOption} XOF</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <span>Location pour {nbrJours} jours :</span>
              <span className="font-semibold">{montantParJours} XOF</span>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between">
              <span>Montant total :</span>
              <span className="font-semibold">{montantTotal} XOF</span>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                className="btn btn-wide bg-sky-700 text-white"
                onClick={handleReservationPayment}
                disabled={btnState}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal DaisyUI */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 px-10">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4">Réservation réussie</h2>
            <p className="mb-6">{modalMessage}</p>
            <button
              className="btn btn-wide bg-sky-700 text-white"
              onClick={() => {
                setShowModal(false);
                window.open(redirectUrl, "_blank");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassageReservation;
