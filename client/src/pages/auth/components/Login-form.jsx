import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {useForm} from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import TokenContext from '../../../contexts/token.context'

const LoginForm = ({url}) => {
  const { login } = useContext(TokenContext)
  const {register, handleSubmit, formState: {errors}} = useForm()
  const navigate = useNavigate()
  const verif = url
  const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  let apiUrl = null

  useEffect(() => {
    if(localStorage.getItem('logout') === 'y') {
      localStorage.removeItem('previousURL')
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      verif.includes("authentification")
      ? apiUrl = "http://localhost:5000/api/client/signin" 
      : apiUrl = "http://localhost:5000/api/user/login";

      const rep = await axios.post(apiUrl, data)
      toast.success(rep.data.message)
      login(rep.data.token)

      const previousURL = localStorage.getItem("previousURL")
      if(previousURL){
        localStorage.removeItem("previousURL")
        navigate(previousURL)
      } else {
        verif.includes("authentification") 
        ? navigate("/") 
        : navigate("/members-dashboard")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
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
          <p className="text-xl text-gray-600 text-center">Content de vous revoir !</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
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
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Votre Mot de Passe
                </label>
              </div>
              <input
                className="
                text-gray-700 border border-gray-300
                rounded py-2 px-4 block w-full focus:outline-2 
                focus:outline-blue-700"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: mdpRegex
                })}
                type="password"
                required
              />
              {errors.password && <span className="
                mt-2 text-sm text-red-500
              ">
                Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
              </span>}
              <Link
                to="#"
                className="text-xs text-gray-600 hover:text-gray-900 text-end w-full mt-2"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Se connecter
              </button>
            </div>
            {
              verif.includes("authentification")? (
                <div className="mt-4 flex items-center w-full text-center">
                  <Link
                    to="#"
                    className="text-xs text-gray-500 capitalize text-center w-full"
                  >
                    Vous n&apos;avez pas de compte?
                    <span className="text-blue-700"> S&apos;inscrire</span>
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <br />
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  url: PropTypes.string
}

export default LoginForm