import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "./Menuitems";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const accentColor = "rgb(191,23,23)";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-start px-4 sm:px-6 py-3">

                    <div className="flex items-center gap-3 flex-shrink-0 mr-8">
                        <img src={logo} alt="School Logo" className="h-10 w-auto" />
                        <span className="font-bold text-lg text-gray-800 hidden sm:block">
                            Aayam Global School
                        </span>
                    </div>


                    <div className="hidden md:flex flex-wrap justify-start py-1 w-full">
                        <nav className="flex flex-wrap gap-4 lg:gap-6">
                            {menuItems.map((val, i) => (
                                <NavLink
                                    key={i}
                                    to={val.path}
                                    className="text-sm transition flex-shrink-0 whitespace-nowrap px-2 py-1"
                                    style={({ isActive }) => ({
                                        color: isActive ? accentColor : '#4B5563', // gray-600 for inactive
                                        borderBottom: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
                                    })}
                                >
                                    {val.name}
                                </NavLink>

                            ))}
                        </nav>
                    </div>

                    <div className="md:hidden ml-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${accentColor}]`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
                        {menuItems.map((val, i) => (
                            <NavLink
                                key={i}
                                to={val.path}
                                className={({ isActive }) =>
                                    `text-base transition py-2 px-4 rounded-lg ${isActive
                                        ? `text-[${accentColor}] font-medium bg-[${accentColor}] bg-opacity-10`
                                        : `text-gray-700 hover:text-[${accentColor}] hover:bg-gray-50`
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                {val.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </header>

            <div className="h-[72px] md:h-[80px]"></div>
        </>
    );
}
