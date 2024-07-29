import React from 'react'
import { FaUser, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-white text-coffee-dark border-b border-gray-200'>
        <div className='flex items-center gap-4'>
            <FaSearch size={24} />
            <input type='text' placeholder='Search' className='border-none outline-none' />
        </div>
        <div className='flex items-center gap-4'>
            <IoNotifications size={24} />
            <FaUser size={24} />
        </div>
    </header>
  )
}

export default Header