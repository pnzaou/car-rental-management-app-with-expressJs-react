import PropTypes from "prop-types";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";


const DataWrapper = ({ isLoading, isError, onRetry, children }) => {
    if (isLoading) {
        return <Loader />;
      }
    
      if (isError) {
        return <ErrorDisplay onRetry={onRetry} />;
      }
    
      return <>{children}</>;
};


export default DataWrapper

DataWrapper.propTypes = {
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    onRetry: PropTypes.func,
    children: PropTypes.node
}