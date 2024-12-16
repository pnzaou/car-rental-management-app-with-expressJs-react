import PropTypes from "prop-types";
import { format } from "date-fns";

const DetailsClientInfoSide = ({data}) => {
    return (
        <div className="w-1/2 rounded-box shadow-md pl-5 pt-5 pb-7">
            <h1 className="font-bold">Informations sur le client</h1>
            <div className="mt-5">
                <div>
                    <h2 className="font-semibold text-accent">Nom:</h2>
                    <p className="font-bold">{data.nom}</p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Prénom:</h2>
                    <p className="font-bold">{data.prenom}</p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Email:</h2>
                    <p className="font-bold">{data.email}</p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Téléphone:</h2>
                    <p className="font-bold">{data.tel}</p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Numéro du permis:</h2>
                    <p className="font-bold">{data.numeroPermis}</p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Date d&apos;expiration du permis:</h2>
                    <p className="font-bold">
                        {format(new Date(data.expirationPermis), "dd/MM/yyyy")}
                    </p>
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-accent">Inscrit le:</h2>
                    <p className="font-bold">
                        {format(new Date(data.createdAt), "dd/MM/yyyy")}
                    </p>
                </div>
            </div>
        </div>
    );
}

DetailsClientInfoSide.propTypes = {
    data: PropTypes.shape({
        nom: PropTypes.string,
        prenom: PropTypes.string,
        email: PropTypes.string,
        tel: PropTypes.string,
        numeroPermis: PropTypes.string,
        expirationPermis: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
};

export default DetailsClientInfoSide;
