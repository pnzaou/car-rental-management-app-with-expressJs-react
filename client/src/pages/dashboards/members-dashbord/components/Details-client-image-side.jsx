import PropTypes from "prop-types";

const DetailsClientImageSide = ({title, src, onClick}) => {
    return (
        <div
            className="rounded-box shadow-md py-5 cursor-pointer"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="pl-5">
                <h1 className="font-bold">{title}</h1>
            </div>
            <div className="flex justify-center mt-4">
                <img src={src} alt={title} className="w-40 h-40 object-cover rounded-md" />
            </div>
        </div>
    );
}

DetailsClientImageSide.propTypes = {
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default DetailsClientImageSide;
