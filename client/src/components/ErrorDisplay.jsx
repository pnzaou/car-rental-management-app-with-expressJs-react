import PropTypes from "prop-types";

const ErrorDisplay = ({ onRetry }) => (
  <div className="flex flex-col justify-center items-center min-h-screen text-center text-red-500">
    <h1>Erreur lors du chargement des données</h1>
    {onRetry && (
      <button onClick={onRetry} className="btn btn-primary mt-4">
        Réessayer
      </button>
    )}
  </div>
);

export default ErrorDisplay;

ErrorDisplay.propTypes = {
    onRetry: PropTypes.func
}
