import React, { useEffect, useState } from 'react'
import { Authentication } from '../Utils/Authentication'
import { useUserValue } from '../Context/userContext'
import { actionTypes } from '../Context/Reducers/UserReducer';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

function Header() {
  const [{ user }, dispatch] = useUserValue();
  const [show, setShow] = useState(false)

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
    <header className='w-100 h-20 bg-slate-400 px-5'>
      <div className='float-right flex  h-[100%] items-center cursor-pointer '>
        <div className='rounded-3xl bg-orange-300 h-[60%] w-[50px] flex items-center px-3 justify-center'>
          {user && user?.name.substring(0, 2)}
        </div>
        <div className='flex flex-col justify-center items-center h-[100%] ml-3'>

          {user && user?.name}
          <h1>{user && user?.email}</h1>


        </div>
        <div className='ml-2' onClick={() => setShow(!show)}>
         { show ? <IoIosArrowUp /> : <IoIosArrowDown /> }
        </div>  
      <div className={show ? "h-20 w-10 bg-slate-500 absolute top-20 ":"hidden"}>
          
        </div>
      </div>

    </header>
  )
}

export default Header