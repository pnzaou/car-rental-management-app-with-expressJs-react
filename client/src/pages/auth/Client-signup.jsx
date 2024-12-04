import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import SignUpFirstStep from "./components/Sign-up-first-step"
import SignUpSecondStep from "./components/Sign-up-second-step"
import axios from "axios"
import toast from "react-hot-toast"

const ClientSignup = () => {
  const [step, setStep] = useState(1)
  const {register, handleSubmit, formState: {errors}, watch} = useForm()
  const navigate = useNavigate()
  const password = watch("password")
  

  const onSubmit = async (data) => {
    try {
      if(step < 2) {
        setStep(step + 1)
      } else {
        const formData = new FormData()
        formData.append("nom", data.nom)
        formData.append("tel", data.tel)
        formData.append("email", data.email)
        formData.append("prenom", data.prenom)
        formData.append("password", data.password)
        formData.append("photoCNI", data.photoCNI[0])
        formData.append("numeroPermis", data.numeroPermis)
        formData.append("photoPermis", data.photoPermis[0])
        formData.append("expirationPermis", data.expirationPermis)
        const rep = await axios.post("http://localhost:5000/api/clients", formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
        toast.success(rep.data.message)
        navigate("/authentification")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url("/img/login.svg")`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="font-bold text-xl text-gray-600 text-center">INSCRIPTION</p>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {step === 1 && (<SignUpFirstStep register={register} errors={errors} password={password}/>)}
            {step === 2 && (<SignUpSecondStep register={register} errors={errors}/>)}
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                {step > 1 ? "S'inscrire" : "Continuer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientSignup
