import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TokenContext from "../../../contexts/token.context";
import useFetchData from "../../../hooks/useFetchData";
import DataWrapper from "../../../components/DataWrapper";
import { useNavigate } from "react-router-dom";


const AjoutUser = () => {

    const navigate = useNavigate()
    const {token} = useContext(TokenContext)
    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const password = watch("password")
    const queryKey = "prlData"
    const url = "http://localhost:5000/api/profils"
    

    const {data, isLoading, isError, refetch} = useFetchData(queryKey, url, token)

    const onSubmit = async (data) => {
        try {
            const rep = await axios.post("http://localhost:5000/api/users",data, {
                headers: {
                    Authorization: token
                }
            })
            navigate("/members-dashboard/settings/utilisateurs")
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <DataWrapper isLoading={isLoading} isError={isError} onRetry={refetch}>
            <div className="shadow-lg p-6 bg-base-200 rounded-lg w-full max-w-3xl mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Nom et Prénom sur la même ligne */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Entrez le nom"
                        className="input input-bordered w-full"
                        {...register("nom", {
                            required: true
                        })}
                    />
                    {errors.nom && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir le nom de l&apos;utilisateur 
                        </span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Prénom</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Entrez le prénom"
                        className="input input-bordered w-full"
                        {...register("prenom", {
                            required: true
                        })}
                    />
                    {errors.prenom && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir le prénom de l&apos;utilisateur 
                        </span>}
                    </div>
                </div>

                {/* Email et Téléphone sur la même ligne */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        inputMode="email"
                        placeholder="Entrez l'email"
                        className="input input-bordered w-full"
                        {...register("email", {
                            required: true,
                            pattern: emailRegex
                        })}
                    />
                    {errors.email && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir l&apos;email de l&apos;utilisateur 
                        </span>}
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Téléphone</span>
                    </label>
                    <input
                        type="tel"
                        inputMode="tel"
                        placeholder="Entrez le téléphone"
                        className="input input-bordered w-full"
                        {...register("telephone",{
                            required: true
                        })}
                    />
                    {errors.telephone && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir le numéro de l&apos;utilisateur 
                        </span>}
                    </div>
                </div>

                {/* Password et Confirm Password */}
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Mot de passe</span>
                    </label>
                    <input
                    type="password"
                    placeholder="Entrez le mot de passe"
                    className="input input-bordered w-full"
                    {...register("password",{
                        required: true,
                        pattern: mdpRegex
                    })}
                    />
                    {errors.newPassword && <span className="
                        mt-2 text-sm text-red-500
                    ">
                        Votre mot de passe doit comporter au moins 8 caractères, dont une lettre majuscule, un caractère spécial et un chiffre. 
                    </span>}
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Confirmer le mot de passe</span>
                    </label>
                    <input
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    className="input input-bordered w-full"
                    {...register("password2",{
                        required: true,
                        pattern: mdpRegex,
                        validate: value =>
                            value === password || "Les mots de passe ne sont pas identiques."
                    })}
                    />
                    {errors.password2 && (
                        <span className="mt-2 text-sm text-red-500">
                            Les mots de passe ne sont pas identiques.
                        </span>
                    )}
                </div>

                {/* Select pour les profils */}
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Profil</span>
                    </label>
                    <select className="select select-bordered w-full" 
                    {...register("profilId", {
                        required: true
                    })}
                    >
                    <option disabled selected>
                        Choisir un profil
                    </option>
                    {data?.data.map(profil => (
                        <option key={profil._id} value={profil._id}>{profil.nom}</option>
                    ))}
                    </select>
                    {errors.profilId && (
                        <span className="mt-2 text-sm text-red-500">
                            champ requis! veuillez selectionner un profil
                        </span>
                    )}
                </div>

                {/* Bouton d'ajout */}
                <div className="form-control mt-4">
                    <button className="btn btn-neutral w-full">
                    Ajouter l&apos;utilisateur
                    </button>
                </div>
                </form>
            </div>
        </DataWrapper>
    );
}

export default AjoutUser
