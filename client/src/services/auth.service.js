// import axios from 'axios'
// import toast from 'react-hot-toast'

import { Navigate, useNavigate } from "react-router-dom"

// const loginService = async (data, verif, login, navigate) => {
//     let apiUrl = null
//     try {
//         verif.includes("authentification")? 
//         apiUrl = "http://localhost:5000/api/client/signin" 
//         : apiUrl = "http://localhost:5000/api/user/login";
//         const rep = await axios.post(apiUrl, data)
//         toast.success(rep.data.message)
//         login(rep.data.token)
//         navigate('/')
//     } catch (error) {
//         console.log(error)
//         toast.error(error.response.data.message)
//     }
// }

// const logOutService = (url, logout) => {
//     const navigate = useNavigate()
//     const rep = logout()
//     if(rep) {
//         return url.includes("members-dashboard") ? <Navigate to="/members-login"/> : <Navigate to="/authentification"/>
//     }
// }

// export {logOutService}