import { useContext, useEffect } from "react"
import TokenContext from "../../../contexts/token.context"
import { jwtDecode } from "jwt-decode"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm } from "react-hook-form"


export default function AccountSettings() {
    
    const {token} = useContext(TokenContext)

    const {data, isLoading, error} = useQuery("userData", async () => {
        const rep = await axios.get(`http://localhost:5000/api/user`,{
            headers: {
                Authorization: token
            }
        })
        return rep.data
    })

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()

    useEffect(() => {
        if(data) {
            setValue("prenom", data.data.user.prenom)
            setValue("nom", data.data.user.nom)
            setValue("email", data.data.user.email)
            setValue("telephone", data.data.user.telephone)
        }
    },[data, setValue])

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
    <div className=" w-full max-w-4xl p-6 bg-base-100 rounded-box shadow-md mb-16">
        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Compte</h2>
          <p className="text-sm text-gray-600">
            Mettez à jour votre profil et vos informations personnelles ici
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Profil : {data? data.data.profil.nom : ""}</h3>
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
        </div>

        {/* Password Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Mot de passe</h3>
          <div className="flex flex-col gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mot de passe actuel</span>
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nouveau mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="input input-bordered w-full"
              />
              <span className="text-xs text-gray-500">
                Your password must have at least 8 characters, include one uppercase letter, and one number.
              </span>
            </div>

            <div className="form-control w-full">
              <input
                type="password"
                placeholder="Re-type new password"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <button className="btn btn-primary mt-4">Mettre à jour le mot de passe</button>
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
