import React, {useEffect} from 'react'
import Header from '../Components/Header'
import Cookies from 'universal-cookie'


function Dashboard() {

  const cookies = new Cookies()
  useEffect(() => {
    if(cookies.get('jid') === undefined){
      window.location.href = "/login"
    }
  }, [] )

  return (
    <div className='py-3 px-6'>
       <Header /> 
        <h1>Dashboard</h1>



    </div>
  )
}

export default Dashboard