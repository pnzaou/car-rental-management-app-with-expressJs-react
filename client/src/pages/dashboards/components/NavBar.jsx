import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, Navigate } from "react-router-dom";
import TokenContext from "../../../contexts/token.context";
import PropTypes from "prop-types"

const NavBar = ({ toggleSidebar, isOpen, isDash }) => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [navTheme, setNavTheme] = useState(
    localStorage.getItem("theme") === "light" ? "bg-neutral-content" : "bg-neutral"
  )
  const { token, logout } = useContext(TokenContext);
  const { userNom, userPrenom } = jwtDecode(token);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
      setNavTheme("bg-neutral")
    } else {
      setTheme("light");
      setNavTheme("bg-neutral-content")
    }
  };

  console.log(navTheme);

  const logOutService = () => {
    const url = window.location.href
    const rep = logout()
    if(rep) {
      localStorage.setItem("theme", "light")
      document.querySelector("html").setAttribute("data-theme", "light")
      return url.includes("members-dashboard") ? <Navigate to="/members-login"/> : <Navigate to="/authentification"/>
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    localTheme === "dark"
      ? (document.getElementById("toggle-theme").checked = true)
      : (document.getElementById("toggle-theme").checked = false);
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className={`navbar fixed top-0 left-0 z-10 flex justify-between shadow-md ${navTheme} ${isOpen ? "lg:ml-80" : "ml-0"}`}>
      <div className="flex-none">
        {isDash && <button
          className="btn btn-square btn-ghost"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>}
      </div>
      <div className={`flex-none gap-4 ${isOpen ? "lg:pr-80" : "pl-0"}`}>
        <div className="pt-1">
            <label className="grid cursor-pointer place-items-center">
                <input
                type="checkbox"
                id="toggle-theme"
                value="synthwave"
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                onChange={handleToggle}
                />
                <svg
                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
        </div>
        <div className="form-control font-semibold">
          Bonjour {`${userPrenom} ${userNom}`}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 rounded-full bg-slate-500 text-white flex justify-center items-center pt-3">
              {`${userPrenom.at(0)}${userNom.at(0)}`}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/members-dashboard/settings">Réglages</Link>
            </li>
            <li>
              <button onClick={logOutService}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

NavBar.propTypes = {
  toggleSidebar: PropTypes.func,
  isOpen: PropTypes.bool,
  isDash: PropTypes.bool
}
