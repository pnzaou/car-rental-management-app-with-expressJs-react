import { useContext, useEffect } from "react"
import TokenContext from "../../../contexts/token.context"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import ChangePassword from "./Change-password"


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

    const {register, handleSubmit, setValue} = useForm()

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
        <ChangePassword/>

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
