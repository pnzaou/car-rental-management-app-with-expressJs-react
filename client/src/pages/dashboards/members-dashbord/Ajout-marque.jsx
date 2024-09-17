import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function AjoutMarque() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append("nom", data.nom);
            formData.append("paysDorigine", data.paysDorigine);
            formData.append("image", data.image[0]);
            const rep = await axios.post("http://localhost:5000/api/marques", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate("/members-dashboard/marques")
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
            <div className="breadcrumbs text-sm">
            <ul>
                <li><Link to="/members-dashboard">Tableau de bord</Link></li>
                <li><Link to="/members-dashboard/marques">Liste des marques</Link></li>
                <li>Ajout</li>
            </ul>
        </div>
        <div className='text-center'>
            <h1 className='text-2xl font-bold'>Ajout d&apos;une marque</h1>
        </div>
        <div className="mt-10 shadow-lg p-6 bg-base-200 rounded-lg w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Nom de la marque *</span>
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

            <div className="form-control mb-4">
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

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Logo *</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("image", {
                    required: true
                })}
              />
              {errors.nom && <span className="
                            mt-2 text-sm text-red-500
                        ">
                            Champ requis! Ajouter le logo de la marque 
                        </span>}
            </div>

            <div className="form-control mt-8">
              <button className="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    );
}
