import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../../contexts/token.context";


const ChangePassword = () => {

    const navigate = useNavigate() 
    const {token, logout} = useContext(TokenContext)
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const {register: registerPass, handleSubmit: handleSubmitPass, formState: {errors: errorsPass}, watch} = useForm()
    const newPassword = watch("newPassword")

    const onSubmitPass = async (data) => {
        try {
            const rep = await axios.patch("http://localhost:5000/api/user/password", data, {
                headers: {
                    Authorization: token
                }
            })
            const repLogout = logout()
            if(repLogout){
                localStorage.setItem("theme", "light")
                document.querySelector("html").setAttribute("data-theme", "light")
                navigate("/members-login")
            }
            toast.success(rep.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="mb-12">
            <form onSubmit={handleSubmitPass(onSubmitPass)}>
                <h3 className="text-xl font-semibold mb-4">Mot de passe</h3>
                <div className="flex flex-col gap-4">
                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Mot de passe actuel</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Saisissez votre ancien mot de passe"
                        className="input input-bordered w-full"
                        {...registerPass("oldPassword", {
                            required: true
                        })}
                    />
                    {errorsPass.oldPassword && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir votre ancien mot de passe 
                        </span>}
                    </div>

                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Nouveau mot de passe</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Saisissez le nouveau mot de passe"
                        className="input input-bordered w-full"
                        {...registerPass("newPassword", {
                            required: true,
                            pattern: mdpRegex
                        })}
                    />
                    {errorsPass.newPassword && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Votre mot de passe doit comporter au moins 8 caractères, dont une lettre majuscule, un caractère spécial et un chiffre. 
                        </span>}
                    </div>

                    <div className="form-control w-full">
                    <input
                        type="password"
                        placeholder="Ressaisissez le nouveau mot de passe"
                        className="input input-bordered w-full"
                        {...registerPass("newPassword2", {
                            required: true,
                            pattern: mdpRegex,
                            validate: value =>
                                value === newPassword || "Les mots de passe ne correspondent pas."
                        })}
                    />
                    {errorsPass.newPassword2 && (
                        <span className="mt-2 text-sm text-red-500">
                            Les mots de passe ne correspondent pas.
                        </span>
                    )}
                    </div>
                </div>
                <button className="btn btn-primary mt-4">Mettre à jour le mot de passe</button>
            </form>
        </div>
    );
}

export default ChangePassword;
