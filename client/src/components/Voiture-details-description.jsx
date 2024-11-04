import PropTypes from "prop-types";

const VoitureDetailsDescription = ({data}) => {
    return (
        <div className="p-5 rounded-xl bg-white shadow-md mt-6 border">
            <h2 className="my-2 font-medium text-2xl">Description</h2>
            <p className="text-justify">
                {data?.categorie.description}
            </p>
        </div>
    );
}

VoitureDetailsDescription.propTypes = {
    data: PropTypes.shape({
        categorie: PropTypes.shape({
            description: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default VoitureDetailsDescription;
