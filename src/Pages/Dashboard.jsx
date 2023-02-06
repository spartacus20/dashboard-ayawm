import React, { useEffect, useState } from 'react'
import axios from "../Services/axios.js"
import { products_url } from "../Utils/constants"
import Header from '../Components/Header'
import Cookies from 'universal-cookie'
import Sidebar from '../Components/Sidebar'
import { TbClipboardList } from 'react-icons/tb'
import { IoCartOutline } from 'react-icons/io5'
import { BsTruck } from 'react-icons/bs'
import { FaGreaterThanEqual } from 'react-icons/fa'
import DashboardCard from '../Components/DashboardCard'
import { useProductValue } from '../Context/productContext.js'
import { actionTypes } from '../Context/Reducers/ProductReducer'
import ProductTable from '../Components/ProductTable.jsx'

function Dashboard() {

  const [{ products }, dispatch] = useProductValue()
  const [sidebar, setSidebar] = useState(false)
  const cookies = new Cookies()
  const toggleSidebar = () => { setSidebar(!sidebar) }
  const getProduct = () => {
    axios.get(products_url).then((res) => {
      console.log(res.data.data)
      dispatch({ type: actionTypes.SET_PRODUCTS, products: res.data.data })
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getProduct()
    if (cookies.get('jid') === undefined) {
      window.location.href = "/login"
    }
  }, [])
  console.log(products)
  return (
    <div className='py-3 xl:px-6 '>
      <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} sidebar={sidebar} />
      <h1>Dashboard</h1>
      <div className='xl:ml-[255px] xl:w-[80%] sm:w-[100%] flex xl:flex-row sm:flex-col  xl:justify-between sm:justify-center '>
        <DashboardCard text='Total Orders' number='20' icon={<IoCartOutline size={28} />} />
        <DashboardCard text='Pending Orders' number='5' icon={<TbClipboardList size={28} />} />
        <DashboardCard text='Delivered Orders' number='15' icon={<BsTruck size={28} />} />
        <DashboardCard text='Total Revenue' number='€ 10.000' icon={<FaGreaterThanEqual size={28} />} />
      </div>
      <ProductTable products={products}/>




    </div>
  )
}

export default Dashboard