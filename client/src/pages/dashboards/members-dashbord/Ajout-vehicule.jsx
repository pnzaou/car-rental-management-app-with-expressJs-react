import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TokenContext from '../../../contexts/token.context';
import toast from 'react-hot-toast';

const AjoutVehicule = () => {
    const {token} = useContext(TokenContext)
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [categories, setCategories] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [unites, setUnites] = useState([]);
    const [options, setOptions] = useState([]);
    const [tarifEnabled, setTarifEnabled] = useState(false);

  useEffect(() => {
    // Fetch catégories
    fetch('http://localhost:5000/api/categories', {
        headers: {
            authorization: token
        }
    })
      .then(res => res.json())
      .then(data => setCategories(data.data));

    // Fetch modèles
    fetch('http://localhost:5000/api/marques_and_their_modeles', {
        headers: {
            authorization: token
        }
    })
      .then(res => res.json())
      .then(data => {
        setModeles(data)});

    // Fetch unités
    fetch('http://localhost:5000/api/unites', {
        headers: {
            authorization: token
        }
    })
      .then(res => res.json())
      .then(data => setUnites(data.data));

    // Fetch options de location
    fetch('http://localhost:5000/api/options')
      .then(res => res.json())
      .then(data => setOptions(data.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const selectedOptions = options
      .filter(option => data[`option_${option._id}`])
      .map(option => ({
        optionLocationId: option._id,
        tarifOption: data[`tarifOption_${option._id}`] || 0,
      }));

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (key !== 'images') {
          formData.append(key, data[key]);
        }
      });

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append(`images`, file); 
        });
      }

      formData.append('selectedOptions', JSON.stringify(selectedOptions));

      // Submit the form
      const rep = await fetch('http://localhost:5000/api/voitures', {
        method: 'POST',
        body: formData,
      })
      const response = await rep.json()
      toast.success(response.message, {
        position: 'bottom-right'
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  const handleUniteChange = (e) => {
    setTarifEnabled(e.target.value !== '');
  };

  // Utilisation de `watch` pour suivre les cases à cocher des options
  const watchOptions = watch();

  const watchUniteTarification = watch('uniteTarificationId');

  return (
    <div className="container mx-auto p-9 bg-base-100 rounded-box shadow-md">
      <h1 className="text-2xl mb-4">Ajouter une Voiture</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        {/* Immatriculation et Date de Mise en Circulation */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="immatriculation">Immatriculation (Si il y&apos;a)</label>
            <input
              type="text"
              id="immatriculation"
              placeholder="Immatriculation"
              className="input input-bordered w-full"
              {...register('immatriculation')}
            />
          </div>
          <div>
            <label className="label" htmlFor="DateMiseCirculation">Date de Mise en Circulation</label>
            <input
              type="date"
              id="DateMiseCirculation"
              className="input input-bordered w-full"
              {...register('DateMiseCirculation')}
            />
          </div>
        </div>

        {/* Type de Carburant et Capacité d'Assise */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="typeCarburant">Type de Carburant*</label>
            <select
              id="typeCarburant"
              className="select select-bordered w-full"
              {...register('typeCarburant', {
                required: true
              })}
            >
              <option value="">Sélectionner un type de carburant</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="électrique">Électrique</option>
              <option value="hybride">Hybride</option>
            </select>
              {errors.typeCarburant && <span className="
                    mt-2 text-sm text-red-500
                ">
                    Champ requis! Veuillez selectionner une option
                </span>}
          </div>
          <div>
            <label className="label" htmlFor="capaciteDassise">Capacité d&apos;Assise*</label>
            <input
              type="number"
              id="capaciteDassise"
              placeholder="Capacité d'assise"
              className="input input-bordered w-full"
              min="1"
              {...register('capaciteDassise', {
                required: true
              })}
            />
            {errors.capaciteDassise && <span className="
                  mt-2 text-sm text-red-500
              ">
                  Champ requis! Veuillez renseigner la capacité d&apos;assise
              </span>}
          </div>
        </div>

        {/* Catégories et Modèles */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="categorieId">Catégorie*</label>
            <select
              id="categorieId"
              className="select select-bordered w-full"
              {...register('categorieId', {
                required: true
              })}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.nom}
                </option>
              ))}
            </select>
            {errors.categorieId && <span className="
                  mt-2 text-sm text-red-500
              ">
                  Champ requis! Veuillez selectionner une catégorie
              </span>}
          </div>
          <div>
            <label className="label" htmlFor="modeleId">Modèle*</label>
            <select
              id="modeleId"
              className="select select-bordered w-full"
              {...register('modeleId', {
                required: true
              })}
            >
              <option value="">Sélectionner un modèle</option>
              {modeles.map(marque => (
                <optgroup key={marque._id} label={marque.nom}>
                  {marque.modeles.map(modele => (
                    <option key={modele._id} value={modele._id}>
                      {modele.nom}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.modeleId && <span className="
                  mt-2 text-sm text-red-500
              ">
                  Champ requis! Veuillez selectionner un modèle
              </span>}
          </div>
        </div>

        {/* Unité de tarification et Tarif Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="uniteTarificationId">Unité de tarification (En cas de location)</label>
            <select
              id="uniteTarificationId"
              className="select select-bordered w-full"
              {...register('uniteTarificationId')}
              onChange={handleUniteChange}
            >
              <option value="">Sélectionner une unité</option>
              {unites.map(unite => (
                <option key={unite._id} value={unite._id}>
                  {unite.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="tarifLocation">Tarif Location</label>
            <input
              type="number"
              id="tarifLocation"
              placeholder="Tarif Location"
              className="input input-bordered w-full"
              disabled={!tarifEnabled}
              {...register('tarifLocation', {
                required: watchUniteTarification ? "Champ requis si une unité est sélectionnée" : false,
              })}
            />
            {errors.tarifLocation && <span className="
                  mt-2 text-sm text-red-500
              ">
                  {errors.tarifLocation.message}
              </span>}
          </div>
        </div>

        {/* Options de location */}
        <div>
          <label className="label">Options de location (cliquez pour sélectionner/déselectionner)</label>
          <div className="grid grid-cols-2 gap-4">
            {options.map(option => (
              <div key={option._id} className="form-control">
                <label
                  className={`cursor-pointer label ${
                    watchOptions[`option_${option._id}`] ? 'border border-blue-500 rounded-lg' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    {...register(`option_${option._id}`)}
                    id={`option_${option._id}`}
                  />
                  <label className="label-text cursor-pointer" htmlFor={`option_${option._id}`}>
                    {option.nom}
                  </label>
                </label>
                {watchOptions[`option_${option._id}`] && (
                  <input
                    type="number"
                    className="input input-bordered mt-2 w-full"
                    placeholder="Tarif de l'option"
                    {...register(`tarifOption_${option._id}`)}
                    required
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div>
          <label className="label" htmlFor="capaciteDassise">Quantité (En cas de vente sans plaque d&apos;immatriculation)</label>
          <input
            type="number"
            id="capaciteDassise"
            placeholder="Capacité d'assise"
            className="input input-bordered w-full"
            min="1"
            {...register('quantite')}
          />
        </div>   
        {/* Images */}
        <div>
          <label className="label" htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            multiple
            className="file-input file-input-bordered w-full"
            {...register('images', {
                required: true
              })}
          />
          {errors.images && <span className="
              mt-2 text-sm text-red-500
          ">
              Champ requis! Veuillez renseigner la tarification
          </span>}
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="btn btn-primary w-full">Ajouter la Voiture</button>
        </div>
      </form>
    </div>
  );
};

export default AjoutVehicule;
