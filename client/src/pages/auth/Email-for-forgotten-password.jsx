import axios from "axios"
import { useForm } from "react-hook-form" 
import toast from "react-hot-toast"


const EmailForForgottenPassword = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

    const onSubmit = async (data) => {
        try {
            const rep = await axios.post("http://localhost:5000/api/client/request-password-recovery", data)
            toast.success(rep.data.message)
        } catch (error) {
            toast.error(error.response.data.message);
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
                <p className="text-xl text-gray-600 text-center">Recevez un lien pour changer votre mot de passe</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-10">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                        Votre Email
                    </label>
                    <input
                        className="
                        text-gray-700 border border-gray-300 
                        rounded py-2 px-4 block w-full focus:outline-2 
                        focus:outline-blue-700"
                        {...register("email", {
                        required: true,
                        pattern: emailRegex
                        })}
                        type="text"
                        required
                    />
                    {errors.email && <span className="
                        mt-2 text-sm text-red-500
                    ">
                        Champ requis! Veuillez saisir un email valid
                    </span>}
                    </div>
                    <div className="mt-8">
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                        Soumettre
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default EmailForForgottenPassword;
