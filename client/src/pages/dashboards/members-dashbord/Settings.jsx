import { Outlet } from "react-router-dom"
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
                    <a className="active">Compte</a>
                    </li>
                    <li>
                    <a>API Keys</a>
                    </li>
                    <li>
                    <a>Notifications</a>
                    </li>
                </ul>
                </div>
                <div className="py-2">
                <h3 className="text-lg font-semibold">Workspace</h3>
                <ul className="menu menu-compact">
                    <li>
                    <a>Billing</a>
                    </li>
                    <li>
                    <a>Integrations</a>
                    </li>
                    <li>
                    <a>Team Members</a>
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