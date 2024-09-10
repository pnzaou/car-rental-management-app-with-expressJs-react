import React from "react";
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
            <li><Link to="#">Sidebar Item 1</Link></li>
  
            {/* Sidebar Item with sub-items (dropdown on hover) */}
            <li className="dropdown dropdown-hover">
              <label tabIndex={0} className="">Sidebar Item 2</label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2"
              >
                <li><Link to="#">Sub-item 1</Link></li>
                <li><Link to="#">Sub-item 2</Link></li>
              </ul>
            </li>
  
            <li><Link to="#">Sidebar Item 3</Link></li>
  
            <li className="dropdown dropdown-hover">
              <label tabIndex={0} className="">Sidebar Item 4</label>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2 ml-10"
              >
                <li><Link to="#">Sub-item A</Link></li>
                <li><Link to="#">Sub-item B</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default SideBar;

SideBar.propTypes = {
    isOpen: PropTypes.bool
}
