import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import TokenContext from "../../../../contexts/token.context";
import toast from "react-hot-toast";
import PropTypes from "prop-types"


const ModeleForm = ({marqueId, refetch}) => {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const {token} = useContext(TokenContext)

    const onSubmit = async (data) => {
        try {
            const rep = await axios.post(`http://localhost:5000/api/modeles/${marqueId}`, data, {
                headers: {
                    Authorization: token
                }
            })
            setValue("nom", "")
            setValue("description", "")
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
            refetch()
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <div>
            {/* Bouton pour ouvrir le pop-up */}
            <label htmlFor="auth-modal" className="btn btn-neutral btn-sm">Ajouter un modèle</label>

            {/* Modal */}
            <input type="checkbox" id="auth-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="auth-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Ajout d&apos;un modèle</h3>
                
                    {/* Formulaire */}
                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nom du modèle</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Entrez le nom du modèle" 
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
                                <span className="label-text">description</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Entrez la description du modèle" 
                                className="input input-bordered w-full"
                                {...register("description", {
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
    );
}

export default ModeleForm;

ModeleForm.propTypes = {
    marqueId: PropTypes.string,
    refetch: PropTypes.func
}
