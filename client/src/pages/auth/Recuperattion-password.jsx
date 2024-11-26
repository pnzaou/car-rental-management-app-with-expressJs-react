import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const RecuperattionPassword = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const navigate = useNavigate()
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const newPassword = watch("newPassword")

    const onSubmit = async (data) => {
        try {
            const rep = await axios.patch(`http://localhost:5000/api/client/confirm-password-recovery?token=${token}`, data)
            navigate("/authentification")
            toast.success(rep.data.message)
        } catch (error) {
            toast(error.response.data.message)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                <div
                className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                style={{
                    backgroundImage: `url("/login.svg")`,
                }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                <p className="text-xl text-gray-600 text-center">Vous allez modifier votre mot de passe</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-10">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            Nouveau mot de passe
                        </label>
                        <input
                            className="
                            text-gray-700 border border-gray-300 
                            rounded py-2 px-4 block w-full focus:outline-2 
                            focus:outline-blue-700"
                            {...register("newPassword", {
                            required: true,
                            pattern: mdpRegex
                            })}
                            type="password"
                        
                        />
                        {errors.email && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
                        </span>}
                    </div>
                    <div className="mt-8">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            Confirmez le mot de passe
                        </label>
                        <input
                            className="
                            text-gray-700 border border-gray-300 
                            rounded py-2 px-4 block w-full focus:outline-2 
                            focus:outline-blue-700"
                            {...register("confirmPassword", {
                            required: true,
                            pattern: mdpRegex,
                            validate: value => 
                                value === newPassword || "Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car"
                            })}
                            type="password"
                            
                        />
                        {errors.confirmPassword && (
                            <span className="mt-2 text-sm text-red-500">
                                Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
                            </span>
                        )}
                    </div>
                    <div className="mt-8">
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                        Confirmer
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default RecuperattionPassword;
