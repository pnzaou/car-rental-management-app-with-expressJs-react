import { useForm } from "react-hook-form";
import PropTypes from "prop-types"
import { useContext } from "react";
import TokenContext from "../../../../contexts/token.context";
import toast from "react-hot-toast";
import axios from "axios";


const UniteTarifForm = ({isEdit, id}) => {
    const {token} = useContext(TokenContext)
    const {register, handleSubmit, formState: {errors}, setValue} =useForm()
    const onSubmit = async (data) => {
        try {
            if(!isEdit){
                const rep = await axios.post("http://localhost:5000/api/unites", data, {
                    headers: {
                        Authorization: token
                    }
                })
                setValue("nom", "")
                toast.success(rep.data.message)
            } else {
                const rep = await axios.put(`http://localhost:5000/api/unite/${id}`, data, {
                    headers: {
                        Authorization: token
                    }
                })
                setValue("nom", "")
                toast.success(rep.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            {/* Bouton pour ouvrir le pop-up */}
            <label htmlFor="auth-modal" className={isEdit? "btn btn-accent btn-sm mr-2" : "btn btn-neutral btn-sm"}>{isEdit? "Modifier" : "Ajouter une unité"}</label>

            {/* Modal */}
            <input type="checkbox" id="auth-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="auth-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{isEdit? "Modification" : "Ajout d'une unité"}</h3>
                
                    {/* Formulaire */}
                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nom de l&apos;unité (ex: 5 jours)</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Entrez le nom" 
                            className="input input-bordered w-full"
                            {...register("nom", {
                                required: true
                            })} 
                        />
                        {errors.nom && <span className="
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

export default UniteTarifForm;

UniteTarifForm.propTypes = {
    isEdit: PropTypes.bool,
    id: PropTypes.string
}
