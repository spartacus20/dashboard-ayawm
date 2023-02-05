import React, { useEffect } from 'react'
import { Authentication } from '../Utils/Authentication'
import { useUserValue } from '../Context/userContext'
import { actionTypes } from '../Context/Reducers/UserReducer';

function Header() {
  const [{ user }, dispatch] = useUserValue();

  const getUserInfo = async () => {
      const response = await Authentication();
      let userInfo = response.data[0];
      // console.log(userInfo.data)
      dispatch({ type: actionTypes.SET_USER, user: userInfo });
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  return (
    <header className='w-100 h-20 bg-slate-400 px-5'>
      <div className='float-right flex flex-col justify-center items-center'>
        <h1>hola</h1>
        {user.name}
    
      </div>
    </header>
  )
}

export default Header