import axios from "axios"
import PropTypes from "prop-types"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useQuery } from "react-query"
import TokenContext from "../../../../contexts/token.context"

const ProfilForm = ({refetch, totalPages, handlePageChange}) => {
    const {token} = useContext(TokenContext)

    const {data} = useQuery("droitData", async () => {
        const rep = await axios.get("http://localhost:5000/api/droits",{
            headers: {
                Authorization: token
            }
        })

        return rep.data
    })
    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const onSubmit = async (data) => {
        try {
            const rep = await axios.post("http://localhost:5000/api/profils", data)
            refetch()
            setValue("nom", "")
            handlePageChange(totalPages)
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
        } catch (error) {
            setValue("nom", "")
            console.log(error.response.data.erreur);
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <div>
            {/* Bouton pour ouvrir le pop-up */}
            <label htmlFor="auth-modal" className="btn btn-neutral btn-sm">Ajouter un profil</label>

            {/* Modal */}
            <input type="checkbox" id="auth-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="auth-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Ajout d&apos;un profil</h3>
                
                    {/* Formulaire */}
                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nom du profil</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Entrez le nom du profil" 
                            className="input input-bordered w-full"
                            {...register("nom", {
                                required: true
                            })} 
                        />
                        {errors.autorisation && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Ce champ est obligatoire!
                        </span>}
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                            <span className="label-text">Droits associés au profil</span>
                            </label>
                            <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto border p-4 rounded">
                            {data?.data.map(droit => (
                                <label key={droit._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={droit._id}
                                    {...register("droitId", {
                                    required: "Veuillez sélectionner au moins un droit."
                                    })}
                                    className="checkbox checkbox-primary mr-2"
                                />
                                <span>{droit.autorisation}</span>
                                </label>
                            ))}
                            </div>
                            {errors.droits && <span className="mt-2 text-sm text-red-500">
                            {errors.droits.message}
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

export default ProfilForm

ProfilForm.propTypes = {
    refetch: PropTypes.func,
    totalPages: PropTypes.number,
    handlePageChange: PropTypes.func
}