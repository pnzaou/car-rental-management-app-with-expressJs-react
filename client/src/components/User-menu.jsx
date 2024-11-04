import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import TokenContext from "../contexts/token.context";
import { jwtDecode } from "jwt-decode";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const {token, logout} = useContext(TokenContext)
  const {clientNom, clientPrenom} = jwtDecode(token)

  const toggleDropdown = () => setIsOpen(!isOpen);

  const logOutFunc = () => {
    const isDisconected = logout()
    if(isDisconected){
      navigate("/authentification")
    }
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="mr-2">👤 {`${clientPrenom} ${clientNom}`}</span>
          <svg
            className="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mon profil
            </a>
            <button
              onClick={logOutFunc}
              className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Se déconnecter <PiSignOutBold />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
