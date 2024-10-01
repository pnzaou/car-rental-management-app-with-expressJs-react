import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const SideBar = ({ isOpen }) => {
    return (
      <div className={`drawer fixed h-full left-0 top-0 bottom-0  w-0 z-20 ${isOpen ? "drawer-open" : ""}`}>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
        <div className="drawer-side h-full">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar items */}
            <li><Link to="/members-dashboard">Tableau de bord</Link></li>
            <hr className="my-2 border-gray-500" />
  
            {/* Sidebar Item with sub-items (dropdown on hover) */}
            <li className="dropdown dropdown-hover relative">
              <label tabIndex={0} className="">Gesttion des catégories</label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2 ml-20"
              >
                <li><Link to="/members-dashboard/categories/ajout">Ajouter une catégorie</Link></li>
                <hr className="my-2 border-gray-500" />
                <li><Link to="/members-dashboard/categories">Lister les catégories</Link></li>
              </ul>
            </li>
            <hr className="my-2 border-gray-500" />
            <li><Link to="#">Sidebar Item 3</Link></li>
            <hr className="my-2 border-gray-500" />
            <li className="dropdown dropdown-hover">
              <label tabIndex={0} className="">Gestion des marques</label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2 ml-20"
              >
                <li><Link to="/members-dashboard/marques/ajout">Ajouter une marque</Link></li>
                <hr className="my-2 border-gray-500" />
                <li><Link to="/members-dashboard/marques">Lister les marques</Link></li>
              </ul>
            </li>
            <hr className="my-2 border-gray-500" />
            <li>
              <Link to="/members-dashboard/unitésdetarificationoptionsdelocation">Unités de tarification/Options de location</Link>
            </li>
            <hr className="my-2 border-gray-500" />
            <li className="dropdown dropdown-hover">
              <label tabIndex={0} className="">Gestion des véhicules</label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2 ml-20"
              >
                <li><Link to="/members-dashboard/vehicules/ajout">Ajouter un véhicule</Link></li>
                <hr className="my-2 border-gray-500" />
                <li><Link to="/members-dashboard/vehicules">Lister les véhicules</Link></li>
              </ul>
            </li>
            <hr className="my-2 border-gray-500" />
          </ul>
        </div>
      </div>
    );
};

export default SideBar;

SideBar.propTypes = {
    isOpen: PropTypes.bool
}
