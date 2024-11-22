import PropTypes from "prop-types";

const VoitureDetailsFeatures = ({data, handeleCheckboxChange, pulse}) => {

    return (
        <div className={`mt-3 p-5 bg-white rounded-xl border shadow-md ${pulse && "animate-pulse"}`} id="options">
            <h2 className="font-medium text-2xl">Options de Locations</h2>
            <p className="mt-3 text-justify">Pour une expérience de location de voiture sur mesure, sélectionnez vos options préférées en cliquant dessus.</p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
                {data?.options.map(option => {
                    const tarif = data?.tarifOp.find(t => t.optionLocationId === option._id)

                    return (
                        <div key={option._id} className="flex items-center justify-between p-2">
                            <label className="cursor-pointer text-nowrap">
                                <input
                                    type="checkbox"
                                    className="peer hidden"
                                    value={tarif.tarifOption}
                                    onChange={(e) => handeleCheckboxChange(
                                        option._id,
                                        tarif?.tarifOption,
                                        tarif._id,
                                        option.nom,
                                        e.target.checked
                                    )}
                                />
                                <div className={`
                                    peer-checked:bg-sky-800 
                                    peer-checked:text-white 
                                    peer-checked:font-bold border 
                                    border-gray-300 
                                    peer-checked:border-sky-300 
                                    rounded-2xl py-1 px-3 text-center`}>
                                    <span className="mr-2">{option.nom}</span>
                                    <span>{tarif ? `${tarif.tarifOption} FCFA` : "Tarif non disponible"}</span>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

VoitureDetailsFeatures.propTypes = {
    data: PropTypes.shape({
        options: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                nom: PropTypes.string.isRequired,
            })
        ).isRequired,
        tarifOp: PropTypes.arrayOf(
            PropTypes.shape({
                optionLocationId: PropTypes.string.isRequired,
                tarifOption: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
    handeleCheckboxChange: PropTypes.func.isRequired,
    pulse: PropTypes.bool.isRequired
};

export default VoitureDetailsFeatures;
