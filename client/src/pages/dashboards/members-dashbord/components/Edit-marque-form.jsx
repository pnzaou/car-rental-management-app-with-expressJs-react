import axios from "axios";
import PropTypes from "prop-types"
import {useForm} from "react-hook-form"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query"
import { useEffect } from "react";

const EditMarqueForm = ({marData}) => {

    const queryClient = useQueryClient(); 

    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (marData) {
            setValue("nom", marData.data.nom);
            setValue("paysDorigine", marData.data.paysDorigine);
        }
    }, [marData, setValue])

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append("nom", data.nom)
            formData.append("paysDorigine", data.paysDorigine)
            formData.append("image", data.image[0]);
            const rep = await axios.put(`http://localhost:5000/api/marque/${marData.data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            queryClient.invalidateQueries("marqueData")


            navigate("/members-dashboard/marques")
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <div className="shadow-lg p-6 bg-base-200 rounded-lg w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col md:flex-row items-center space-x-4">
                {/* Champ pour le nom de la marque */}
                <div className="form-control mb-4 w-full">
                <label className="label">
                    <span className="label-text">Nom de la marque</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Entrez le nom de la marque" 
                    className="input input-bordered w-full" 
                    {...register("nom", {
                        required: true
                    })}
                />
                {errors.nom && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir le nom de la marque 
                        </span>}
                </div>
                
                {/* Champ pour le pays d'origine */}
                <div className="form-control mb-4 w-full">
                <label className="label">
                    <span className="label-text">Pays d&apos;origine</span>
                </label>
                <input 
                    type="text"
                    placeholder="Entrez le pays d'origine" 
                    className="input input-bordered w-full" 
                    {...register("paysDorigine")}
                />
                </div>
                
                {/* Champ pour le logo */}
                <div className="form-control mb-4 w-full">
                <label className="label">
                    <span className="label-text">Logo</span>
                </label>
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full" 
                    {...register("image")}
                />
                </div>

                {/* Bouton de soumission */}
                <div className="form-control mt-5">
                <button className="btn btn-neutral">
                    Modifier
                </button>
                </div>
            </form>
        </div>
    )
}

export default EditMarqueForm

EditMarqueForm.propTypes = {
    marData: PropTypes.object,
    refetch: PropTypes.func
}