import { Link, Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";


const Settings = () => {
    const location = useLocation()
    console.log(location);
    const [url, setUrl] = useState(location.pathname)

    useEffect(() => {
        setUrl(location.pathname)
    }, [location])

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
                    <Link
                        to="/members-dashboard/settings"
                        className={url === "/members-dashboard/settings" ? "active" : ""}
                        onClick={() => setUrl("/members-dashboard/settings")}
                    >
                        Compte
                    </Link>
                    </li>
                </ul>
                </div>
                <div className="py-2">
                <h3 className="text-lg font-semibold">Droits et Profils</h3>
                <ul className="menu menu-compact">
                    <li>
                    <Link
                        to="/members-dashboard/settings/droits"
                        className={url.includes("droits") ? "active" : ""}
                        onClick={() => setUrl("/members-dashboard/settings/droits")}
                    >
                        Droits
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/members-dashboard/settings/profils"
                        className={url.includes("profils") ? "active" : ""}
                        onClick={() => setUrl("/members-dashboard/settings/profils")}
                    >
                        Profils
                    </Link>
                    </li>
                </ul>
                </div>
                <div className="py-2">
                    <h3 className="text-lg font-semibold">Utilisateurs</h3>
                    <ul className="menu menu-complet">
                        <li>
                        <Link
                            to="/members-dashboard/settings/utilisateurs"
                            className={url.includes("utilisateurs") ? "active" : ""}
                            onClick={() => setUrl("/members-dashboard/settings/utilisateurs")}
                        >
                            Liste des utilisateurs
                        </Link>
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