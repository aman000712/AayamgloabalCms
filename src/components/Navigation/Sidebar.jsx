import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "./Menuitems";

const logoColor = "rgb(191, 23, 23)";

function Sidebar() {
    return (
        <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">

            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
                <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                    style={{ backgroundColor: logoColor }}
                >
                    AG
                </div>
                <span className="text-lg font-semibold text-gray-800">Aayam Global</span>
            </div>


            <div className="flex flex-col mt-6 gap-1 px-2">
                {menuItems.map((val, i) => (
                    <NavLink
                        to={val.path}
                        key={i}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200
               ${isActive
                                ? "text-white shadow-md"
                                : "text-gray-700 hover:translate-x-1"}`
                        }
                        style={({ isActive }) =>
                            isActive
                                ? { backgroundColor: logoColor }
                                : { backgroundColor: "transparent" }
                        }
                    >
                        <span className="text-lg">{val.icon}</span>
                        <span className="font-medium">{val.name}</span>
                    </NavLink>
                ))}
            </div>


            <div className="mt-auto px-6 py-4 text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Aayam Global School
            </div>
        </div>
    );
}

export default Sidebar;
