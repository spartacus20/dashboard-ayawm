import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {RiProductHuntLine} from 'react-icons/ri'
import { IoPeopleOutline, IoCartOutline } from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'

function Sidebar({sidebar, toggleSidebar}) {
  return (
    <div className={ sidebar? "sm:hidden bg-white shadow-lg w-60 h-[90vh] absolute   xl:flex xl:flex-col":"bg-white shadow-lg w-60 h-[90vh] absolute sm:flex sm:flex-col xl:flex xl:flex-col"}>
      <AiOutlineClose className='sm:flex xl:hidden ml-4 mt-5 mb-4' onClick={toggleSidebar}/>
      <h1 className='px-10 text-2xl mb-5 mt-6'>AYAWMA</h1>
      <ul className='flex flex-col w-full'>
        <li className='flex items-center px-10 h-10 text-md hover:bg-blue-200 cursor-pointer'>  <AiOutlineHome className='mr-2'/> Home</li>
        <li className='flex items-center px-10 h-10 text-md hover:bg-blue-200 cursor-pointer'> <RiProductHuntLine className='mr-2'/> Products</li>
        <li className='flex items-center px-10 h-10 text-md hover:bg-blue-200 cursor-pointer'> <IoCartOutline className='mr-2'/> Orders</li>
        <li className='flex items-center px-10 h-10 text-md hover:bg-blue-200 cursor-pointer'> <IoPeopleOutline className='mr-2'/> Admins</li>
      </ul>


    </div>
  )
}

export default Sidebar