// import axios from 'axios'
// import toast from 'react-hot-toast'

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

// export {loginService}