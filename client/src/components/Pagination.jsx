import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex justify-center mt-4 mb-10">
        <nav className="btn-group">
          {/* Bouton Précédent */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`btn ${currentPage === 1 ? "btn-disabled" : ""} btn-sm mr-2`}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
  
          {/* Boutons de Pages */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`btn ${currentPage === index + 1 ? "btn-active" : ""} btn-sm mr-1`}
            >
              {index + 1}
            </button>
          ))}
  
          {/* Bouton Suivant */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`btn ${currentPage === totalPages ? "btn-disabled" : ""} btn-sm ml-2`}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </nav>
      </div>
    );
  };
  
export default Pagination;
  
Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func
}