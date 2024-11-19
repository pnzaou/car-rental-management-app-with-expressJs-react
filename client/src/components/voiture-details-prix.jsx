import PropTypes from 'prop-types';

const VoitureDetailsPrix = ({data, handleAction}) => {

    return (
        <div className="p-10 rounded-xl border shadow-md">
            <h2>La location est à partir de 3 jours</h2>
            <h2 className="font-bold text-3xl mt-2">{data?.tarif[0].tarifLocation} fcfa par jour</h2>
            <button className="btn w-full mt-7 bg-sky-700 text-white" onClick={handleAction}>Réserver le véhicule</button>
        </div>
    );
}

VoitureDetailsPrix.propTypes = {
    data: PropTypes.shape({
        tarif: PropTypes.arrayOf(
            PropTypes.shape({
                tarifLocation: PropTypes.number.isRequired, 
            }).isRequired 
        ).isRequired, 
    }).isRequired,
    handleAction: PropTypes.func.isRequired, 
};

export default VoitureDetailsPrix;
