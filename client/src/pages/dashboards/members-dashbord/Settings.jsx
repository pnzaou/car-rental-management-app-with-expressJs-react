import { Link, Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"


const Settings = () => {
  return (
    <div>
        <NavBar isDash={false}/>
        <div className="flex h-full w-full items-start flex-col lg:flex-row gap-4 px-10">
            {/* Settings Menu */}
            <div className="menu bg-base-200 w-full lg:w-64 p-4 rounded-box fixed mt-20">
                <h2 className="text-2xl font-bold">Réglages</h2>
                <div className="py-2">
                <h3 className="text-lg font-semibold">Personnel</h3>
                <ul className="menu menu-compact">
                    <li>
                        <Link to="/members-dashboard/settings" className="active">Compte</Link>
                    </li>
                </ul>
                </div>
                <div className="py-2">
                <h3 className="text-lg font-semibold">Droits et Profils</h3>
                <ul className="menu menu-compact">
                    <li>
                        <Link to="/members-dashboard/settings/droits">Droits</Link>
                    </li>
                    <li>
                    <a>Integrations</a>
                    </li>
                    <li>
                    <a>Team Members</a>
                    </li>
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
                </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="w-full ml-72 mt-20">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}


export default Settings