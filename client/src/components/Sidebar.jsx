import React from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaBoxes, FaStoreAlt } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Sidebar = () => {
  const links = [
    { to: "/", icon: <RiDashboardHorizontalFill  size={24} />, text: "Dashboard" },
    { to: "/products", icon: <FaBoxes  size={24} />, text: "Products" },
    { to: "/orders", icon: <BsCartCheckFill  size={24} />, text: "Orders" },
    { to: "/customers", icon: <FaStoreAlt  size={24} />, text: "Customers" },
  ];
const activeLink = window.location.pathname === "/" ? 0 : links.findIndex((link) => link.to === window.location.pathname);
console.log(activeLink); 
  return (
    <div className=" sticky top-0 h-screen bg-[#f5f5f5] w-28 flex flex-col p-4">
      <div className="p-4 flex items-center justify-center">
        <img src={logo} alt="logo" className="h-16  " />
      </div>
      <nav>
        <ul className="flex flex-col space-y-5 gap-8 mt-5">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} className=" ">
                <div className={`flex flex-col justify-center gap-2 items-center text-sm transition-all duration-300 cursor-pointer
                ${activeLink === index ? "bg-coffee text-white p-4 rounded-md" : "text-coffee"}
                `}>
                  <span className="mr-2">{link.icon}</span>
                  <span>{link.text}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
