import axios from "axios"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const DroitForm = ({refetch, totalPages, handlePageChange}) => {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()

    const onSubmit = async (data) => {
        try {
            const rep = await axios.post("http://localhost:5000/api/droits", data)
            refetch()
            setValue("autorisation", "")
            handlePageChange(totalPages)
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
        } catch (error) {
            setValue("nom", "")
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <div>
            {/* Bouton pour ouvrir le pop-up */}
            <label htmlFor="auth-modal" className="btn btn-neutral btn-sm">Ajouter un droit</label>

            {/* Modal */}
            <input type="checkbox" id="auth-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="auth-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Ajout d&apos;un droit</h3>
                
                    {/* Formulaire */}
                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Autorisation</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Entrez l'autorisation" 
                            className="input input-bordered w-full"
                            {...register("autorisation", {
                                required: true
                            })} 
                        />
                        {errors.autorisation && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Ce champ est obligatoire!
                        </span>}
                        </div>
                        <div className="modal-action">
                        {/* Bouton de soumission */}
                        <button type="submit" className="btn btn-neutral">
                            Valider
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DroitForm

DroitForm.propTypes = {
    refetch: PropTypes.func,
    totalPages: PropTypes.number,
    handlePageChange: PropTypes.func
}