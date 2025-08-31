import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../Navigation/sidebar/menuItems";

function Header() {
  return (
    <div className="ml-64 h-12 bg-white border-b border-gray-200 flex items-center px-6 space-x-6 overflow-x-auto">
      {menuItems.map((val, i) => (
        <NavLink
          key={i}
          to={val.path}
          className={({ isActive }) =>
            `text-sm transition whitespace-nowrap
            ${
              isActive
                ? "text-pink-600 font-medium"
                : "text-gray-600 hover:text-pink-600"
            }`
          }
        >
          {val.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Header;
