import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUserCircle } from "react-icons/lu";
import { notifications } from '../utils/dummyData';
const Header = () => {
  const unreadNotifications = notifications.length;
  const userName = 'John Webster';
  const initials = userName.split(' ').map(name => name[0]).join('');
  return (
    <header className='flex justify-between items-center py-4 px-5 bg-white text-coffee-dark border-b border-gray-200'>
        <div className='flex items-center gap-4 border rounded-md w-1/2 p-3'>
            <CiSearch size={24} />
            <input type='text' placeholder='Search' className='border-none outline-none' />
        </div>
        <div className='flex items-center gap-4'>
            <div className='relative'>
                <IoMdNotificationsOutline size={32} />
                {unreadNotifications > 0 && (
                    <div className='absolute -top-[2px] -right-[2px] h-4 w-4 flex justify-center items-center text-cream-light text-[10px] bg-coffee rounded-full'>
                       {unreadNotifications}
                    </div>
                )}
            </div>
           <div className='flex items-center gap-4'>
               <div className='bg-coffee text-cream-light h-10 w-10 flex justify-center items-center rounded-full'>
                    {initials}
                </div>  
                <span>John Webster</span>
          </div>
        </div>
    </header>
  )
}

export default Header