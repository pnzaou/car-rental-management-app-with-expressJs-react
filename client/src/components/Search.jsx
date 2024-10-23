import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({ categories, marques }) => {
    const [selectState, setSelectState] = useState(true);
    const [modeles, setModeles] = useState([]);
    const [selectedMarque, setSelectedMarque] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedMarque) {
            const fetchModeles = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`http://localhost:5000/api/public/modeles/${selectedMarque}`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des modèles");
                    }
                    const data = await response.json();
                    setModeles(data.data);
                    setSelectState(false);
                } catch (err) { 
                    console.log(err)
                    setError("Impossible de récupérer les modèles");
                } finally {
                    setLoading(false);
                }
            };
            fetchModeles();
        } else {
            setModeles([]);
            setSelectState(true);
        }
    }, [selectedMarque]);

    const handleMarqueChange = (e) => {
        setSelectedMarque(e.target.value);
    };

    return (
        <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex flex-col md:flex-row gap-5 md:gap-10 px-5 items-center w-[60%]">
            {/* Select for Categories */}
            <select
                aria-label="Sélectionnez une catégorie"
                className="select select-bordered w-full max-w-xs outline-none md:border-none focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg"
            >
                <option value="">Catégories</option>
                {categories?.data.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.nom}
                    </option>
                ))}
            </select>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>

            {/* Select for Marques */}
            <select
                onChange={handleMarqueChange}
                aria-label="Sélectionnez une marque"
                className="select select-bordered w-full max-w-xs outline-none md:border-none focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg"
            >
                <option value="">Marques</option>
                {marques?.data.map((mar) => (
                    <option key={mar._id} value={mar._id}>
                        {mar.nom}
                    </option>
                ))}
            </select>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>

            {/* Select for Models */}
            <select
                disabled={selectState}
                aria-label="Sélectionnez un modèle"
                className="select select-bordered w-full max-w-xs outline-none md:border-none focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg"
            >
                <option value="">Modèles</option>
                {loading ? (
                    <option disabled>Chargement...</option>
                ) : error ? (
                    <option disabled>{error}</option>
                ) : (
                    modeles.map((mod) => (
                        <option key={mod._id} value={mod._id}>
                            {mod.nom}
                        </option>
                    ))
                )}
            </select>

            {/* Search Icon */}
            <div>
                <CiSearch className="text-[40px] bg-emerald-600 rounded-full p-2 text-white hover:scale-105 transition-all cursor-pointer" />
            </div>
        </div>
    );
};

export default Search;

Search.propTypes = {
    categories: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                nom: PropTypes.string.isRequired,
            })
        ),
    }),
    marques: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                nom: PropTypes.string.isRequired,
            })
        ),
    }),
};
