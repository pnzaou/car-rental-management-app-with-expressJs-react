import React from "react";
import {useForm} from "react-hook-form"
import PropTypes from "prop-types"
import {useQuery} from "react-query"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";

const CategoryForm = ({isEdit, setTitle}) => {

    const {id} = useParams()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {data, error, isLoading} = useQuery('catData', async () => {
        const rep = await axios.get(`http://localhost:5000/api/categorie/${id}`)
        return rep.data.data
    })

    if(isEdit) {
        if(isLoading) return (
            <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    
        if (error) {
            return (
                <div className="text-center text-red-500">
                    <h1>Erreur lors du chargement des données</h1>
                </div>
            );
        }
    }


    const removeDisabled = () => {
        [...document.getElementsByClassName("desac")].map(el => el.disabled = !isEdit)  
        setTitle("Modification de la catégorie")   
        document.getElementById("removeDisabled").classList.add("hidden")
    }

    const onSubmit = async (data) => {
        try {
            const rep = isEdit ? await axios.put(`http://localhost:5000/api/categorie/${id}`, data) 
            : await axios.post("http://localhost:5000/api/categories", data)
            navigate("/members-dashboard/categories")
            toast.success(rep.data.message, {
                position: "bottom-right"
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right"
            })
        }
    }

    return (
        <div>
            {isEdit && <div className="pl-40"><button id="removeDisabled" className="btn btn-accent absolute" onClick={removeDisabled}>Modifier</button></div>}
            <div className="mt-10 shadow-lg p-6 bg-base-200 rounded-lg w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label">
                        <span className="label-text">Nom *</span>
                        </label>
                        <input
                        type="text"
                        placeholder="Entrez le nom"
                        className="input input-bordered w-full desac"
                        {...register("nom", {
                            required: true
                        })}
                        defaultValue={isEdit? data?.nom : ""}
                        disabled= {isEdit}
                        />
                        {errors.nom && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Veuillez saisir le nom de la catégorie
                        </span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                        <span className="label-text">Description</span>
                        </label>
                        <textarea
                        className="textarea textarea-bordered w-full h-40 desac"
                        placeholder="Entrez la description"
                        {...register("description")}
                        defaultValue={isEdit ? data?.description : ""}
                        disabled= {isEdit}
                        ></textarea>
                    </div>

                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary desac" disabled= {isEdit}>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;

CategoryForm.propTypes = {
    isEdit: PropTypes.bool,
    setTitle: PropTypes.func
}
