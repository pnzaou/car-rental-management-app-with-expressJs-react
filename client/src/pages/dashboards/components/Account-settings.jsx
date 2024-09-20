import { useContext, useEffect } from "react"
import TokenContext from "../../../contexts/token.context"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export default function AccountSettings() {
    
    const {token, logout} = useContext(TokenContext)
    const navigate = useNavigate()
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    const {data, isLoading, error} = useQuery("userData", async () => {
        const rep = await axios.get(`http://localhost:5000/api/user`,{
            headers: {
                Authorization: token
            }
        })
        return rep.data
    })

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        if(data) {
            setValue("prenom", data.data.user.prenom)
            setValue("nom", data.data.user.nom)
            setValue("email", data.data.user.email)
            setValue("telephone", data.data.user.telephone)
        }
    },[data, setValue])

    const {register: registerPass, handleSubmit: handleSubmitPass, formState: {errors: errorsPass}, watch} = useForm()

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

    const newPassword = watch("newPassword")

    if(isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    if (error) {
        return (
            <div className="text-center text-red-500">
                <h1>Erreur lors du chargement de vos informations</h1>
            </div>
        );
    }

  return (
    <div className="w-full max-w-4xl p-6 bg-base-100 rounded-box shadow-md mb-16">
        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Compte</h2>
          <p className="text-sm text-gray-600">
            Mettez à jour votre profil et vos informations personnelles ici
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Profil : {data? data.data.profil.nom : ""}</h3>
          <form onSubmit={handleSubmit()}>
            <div className="flex flex-col gap-4">

              {/* First and Last Name */}
              <div className="flex gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Prénom</span>
                  </label>
                  <input
                    type="text"
                    {...register("prenom")}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nom</span>
                  </label>
                  <input
                    type="text"
                    {...register("nom")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Telephone */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Téléphone</span>
                </label>
                <input
                  type="tel"
                  {...register("telephone")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Password Section */}
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

        {/* Danger Zone */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Zone dangereuse</h3>
          <div className="alert alert-error bg-red-500">
            <div className="flex-1">
              <label className="font-bold">Supprimer le compte</label>
              <span>Supprimez définitivement votre compte. Cette action n&apos;est pas réversible.</span>
            </div>
            <button className="btn btn-error">Supprimer</button>
          </div>
        </div>
    </div>
  )
}
