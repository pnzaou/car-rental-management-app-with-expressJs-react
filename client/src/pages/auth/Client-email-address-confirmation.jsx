import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ClientEmailAddressConfirmation = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer le token de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Envoyer une requête au backend pour confirmer le changement de mot de passe
            const confirmPasswordChange = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/client/email-address-confirmation?token=${token}`);
                    setMessage(response.data.message);
                    toast.success(response.data.message);
                    
                    // Rediriger vers la page de login ou autre
                    setTimeout(() => {
                        navigate('/authentification');
                    }, 2000);

                } catch (error) {
                    setMessage(error.response?.data.message || 'Le lien de confirmation est invalide ou a expiré.');
                    toast.error(message);
                    console.log(error);
                }
            };

            confirmPasswordChange();
        } else {
            setMessage('Lien de confirmation invalide.');
        }
    }, [navigate, message]);

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-semibold mb-4">Confirmation de votre adresse mail</h2>
                    <p className="text-center text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default ClientEmailAddressConfirmation;
