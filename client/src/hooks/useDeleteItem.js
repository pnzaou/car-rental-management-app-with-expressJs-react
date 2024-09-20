import axios from "axios"
import toast from "react-hot-toast"

const useDeleteItem = (token, refetch, setCurrentPage, itemsParPage) => {
    
    const deleteItem = async (id, url, setId) => {
      try {
        const rep = await axios.delete(`${url}/${id}`, {
          headers: {
            Authorization: token
          }
        })
        toast.success(rep.data.message, {
          position: "bottom-right"
        })
        document.querySelector(".alert-error").classList.add("hidden")
        setId("")
        refetch()
        setCurrentPage(prev => {
          const newPage = Math.ceil((prev - 1) / itemsParPage)
          return newPage > 0 ? newPage : 1
        })
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "bottom-right"
        })
      }
    }
  
    const showAlert = (id, setId) => {
      document.querySelector(".alert-error").classList.remove("hidden")
      setId(id)
    }
  
    const hiddenAlert = (setId) => {
      document.querySelector(".alert-error").classList.add("hidden")
      setId("")
    }
  
    return { deleteItem, showAlert, hiddenAlert }
}

export default useDeleteItem
  