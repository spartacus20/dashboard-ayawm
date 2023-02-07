import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { Authentication } from '../Utils/Authentication'
import { useUserValue } from '../Context/userContext'
import { actionTypes } from '../Context/Reducers/UserReducer';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { HiBars4 } from 'react-icons/hi2'
import { AiOutlinePoweroff }  from 'react-icons/ai'

function Header({logOut, toggleSidebar, sidebar}) {
  const [{ user }, dispatch] = useUserValue();
  const [show, setShow] = useState(false)


  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('jid');
    window.location.href = "/login"
  }

  const getUserInfo = async () => {
    const response = await Authentication();
    let userInfo = response.data[0];
    // console.log(userInfo.data)
    dispatch({ type: actionTypes.SET_USER, user: userInfo });
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  console.log(user)
  return (
    <header className={sidebar? 'sm:w-100 xl:w-[80%] xl:ml-64 h-20 bg-white shadow-lg px-5 sm:flex sm:items-center sm:justify-between xl:flex xl:justify-end':"xl:w-[80%] h-20 bg-white xl:ml-64 px-5 sm:flex sm:items-center sm:justify-between xl:flex xl:justify-end shadow-lg"}>
      <HiBars4 className="sm:flex xl:hidden" onClick={toggleSidebar}/>
      <div className='flex  h-[100%] items-center cursor-pointer '>
        <div className='rounded-3xl bg-orange-300 h-[60%] w-[50px] flex items-center px-3 justify-center'>
          {user && user?.name.substring(0, 2)}
        </div>
        <div className='flex flex-col justify-center items-center h-[100%] ml-3'>

          {user && user?.name}
          <h1>{user && user?.email}</h1>


        </div>
        <AiOutlinePoweroff size={20} className='ml-2 text-red-600' onClick={handleLogout}/>
      </div>

    </header>
  )
}

export default Header