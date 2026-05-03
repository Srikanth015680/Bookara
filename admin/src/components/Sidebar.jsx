























import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa"; // FIXED




import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo.png";

const Sidebar = ({setToken}) => {

  const navLinks = [
    { to: "/", icon: <FaSquarePlus size={20} />, label: "Add Items", end: true },
    { to: "/list", icon: <FaListAlt size={20} />, label: "List Items" },
    { to: "/orders", icon: <MdFactCheck size={20} />, label: "Orders" },
  ];

  const activeStyles =
    "bg-purple-600 text-white shadow-md shadow-purple-200 scale-[1.02]";
  const idleStyles =
    "text-gray-500 hover:bg-purple-50 hover:text-purple-600";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden sm:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-100 px-5 py-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-2 mb-10">
          <img src={logo} alt="Bookara" className="w-8 h-8" />
          <span className="text-2xl font-bold text-gray-800">
            Bookara<span className="text-purple-600">.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? activeStyles : idleStyles
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-gray-100">
          <button onClick={()=>setToken('')}   className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <BiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE NAV */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
        <nav className="flex justify-around items-center">

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-400"
                }`
              }
            >
              {link.icon}
              <span className="text-[11px] font-medium">{link.label}</span>
            </NavLink>
          ))}

          {/* Logout */}
          <button onClick={()=>setToken('')} className="flex flex-col items-center gap-1 px-3 py-2 text-gray-400 hover:text-red-500 transition">
            <BiLogOut  size={20} />
            <span className="text-[11px] font-medium">Exit</span>
          </button>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;