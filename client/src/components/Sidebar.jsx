import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaBoxesSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { to: "/", icon: <LuLayoutDashboard size={24} />, text: "Dashboard" },
    { to: "/products", icon: <LiaBoxesSolid size={24} />, text: "Products" },
    { to: "/orders", icon: <BsCartCheck size={24} />, text: "Orders" },
    { to: "/customers", icon: <HiOutlineUserGroup size={24} />, text: "Customers" },
    { to: "/settings", icon: <IoSettingsOutline size={24} />, text: "Settings" },
    
  ];

  const activeLink = location.pathname === "/" ? 0 : links.findIndex((link) => link.to === location.pathname);

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
  return (

    <div className="sticky top-0 h-screen bg-white w-28 flex flex-col p-4"
      style={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div className="p-4 flex items-center justify-center">
        <img src={logo} alt="logo" className="h-16" />
      </div>
      <nav>
        <ul className="flex flex-col space-y-5 gap-8 mt-5">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} className=" ">
                <div className={`flex flex-col justify-center gap-2 items-center text-sm transition-all duration-300 cursor-pointer
                ${activeLink === index ? "bg-coffee text-white p-4 rounded-md" : "text-coffee"}
                `}>
                  <span className="">{link.icon}</span>
                  <span>{link.text}</span>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <div
              onClick={handleLogout}
              className="flex flex-col justify-center gap-2 items-center text-sm transition-all duration-300 cursor-pointer text-coffee"
            >
              <span><IoLogOutOutline size={24} /></span>
              <span>Logout</span>
            </div>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;