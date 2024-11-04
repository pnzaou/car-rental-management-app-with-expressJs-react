import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import UserMenu from "./User-menu";
import TokenContext from "../contexts/token.context";


const Header = () => {
    const [decode, setDecode] = useState(false)
    const {token} = useContext(TokenContext)

    useEffect(() => {
        if(token) {
            const tokenDecode = jwtDecode(token)
            if(tokenDecode.clientProfil === "client") {
                setDecode(true)
            }
        }
    },[])

    return (
        <div className="flex justify-between items-center shadow-md p-5 fixed w-full bg-white top-0 z-20">
            <div>
                LOGO{/* <img src="img/LOGO_LPCY.png" alt="logo du site" className=""/> */}
            </div>
            <div>
                <ul className="hidden md:flex gap-4 ">
                    <li className="font-medium hover:scale-105 
                    transition-all cursor-pointer hover:text-primary">
                        Accueil
                    </li>
                    <li className="font-medium hover:scale-105 
                    transition-all cursor-pointer hover:text-primary">
                        Services
                    </li>
                    {/* <li className="font-medium hover:scale-105 
                    transition-all cursor-pointer hover:text-primary">

                    </li> */}
                    <li className="font-medium hover:scale-105 
                    transition-all cursor-pointer hover:text-primary">
                        Contacts
                    </li>
                </ul>
            </div>
            <div>
                {decode ? (
                    <UserMenu/>
                ) : (
                    <Link to="/authentification">Se Connecter</Link>
                )}
            </div>
        </div>
    );
}

export default Header;
