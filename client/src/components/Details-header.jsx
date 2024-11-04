import PropTypes from 'prop-types';
import {getYear} from "date-fns"
import { HiCalendarDays } from "react-icons/hi2";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";

const DetailsHeader = ({data}) => {
    return (
        <div className="mt-16">
            <div>
                <h2 className="font-bold text-3xl">{data?.modele.nom}</h2>
                <p></p>
                <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                        <HiCalendarDays className="h-7 w-7 text-primary" />
                        <h2 className="text-primary text-sm">{getYear(new Date(data?.DateMiseCirculation))}</h2>
                    </div>
                    <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                        <GiGearStickPattern className="h-7 w-7 text-primary" />
                        <h2 className="text-primary text-sm">{data?.typeBoite}</h2>
                    </div>
                    <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                        <LuFuel className="h-7 w-7 text-primary" />
                        <h2 className="text-primary text-sm">{data?.typeCarburant}</h2>
                    </div>
                    <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                        <HiUserGroup className="h-7 w-7 text-primary" />
                        <h2 className="text-primary text-sm">{data?.capaciteDassise} Places</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

DetailsHeader.propTypes = {
    data: PropTypes.shape({
        modele: PropTypes.shape({
            nom: PropTypes.string.isRequired,
        }).isRequired,
        DateMiseCirculation: PropTypes.string.isRequired,
        typeBoite: PropTypes.string.isRequired,
        typeCarburant: PropTypes.string.isRequired,
        capaciteDassise: PropTypes.number.isRequired,
    }).isRequired,
};

export default DetailsHeader;
