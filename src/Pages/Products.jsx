import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { IoMdRefresh } from 'react-icons/io'
import ProductTable from '../Components/ProductTable'
import { useProductValue } from '../Context/productContext'
import { useUserValue } from '../Context/userContext'
import axios from "../Services/axios.js"
import { products_url } from "../Utils/constants"
import { actionTypes } from '../Context/Reducers/ProductReducer'
import { toast } from 'react-toastify'
import CreateNewProduct from '../Components/CreateNewProduct'
import RichEditor from '../Components/RichText/RichEditor'

function Products() {
    const { user } = useUserValue()

    const [productModal, setProductModal] = useState(false); 
    const toggleModal = () => { setProductModal(!productModal) }

    const [{ products }, dispatch] = useProductValue()
    const [sidebar, setSidebar] = useState(false)
    const toggleSidebar = () => { setSidebar(!sidebar) }
    const fetchProducts = () => {
        axios.get(products_url).then((res) => {
            dispatch({ type: actionTypes.SET_PRODUCTS, items: res.data.data })
            toast.success("Products refreshed")
        }).catch((err) => {
            console.log(err)
        })

    }


    return (
        <div className='py-3 xl:px-6 '>
            <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
            <Header toggleSidebar={toggleSidebar} sidebar={sidebar} />

            <div className='xl:ml-[260px] sm:ml-2 mt-10 flex '>
                <button className='bg-blue-500 text-white px-2 py-1 rounded font-semibold' onClick={() => toggleModal()}>Create New Product</button>
                <CreateNewProduct productModal={productModal} toggleModal={toggleModal} fetchProducts={fetchProducts} />

                <div className='border-2 flex items-center w-[100px] border-blue-500 text-blue-500 font-semibold px-2 py-1 rounded  xl:ml-10 sm:ml-4 cursor-pointer ' onClick={fetchProducts}>
                    <IoMdRefresh />
                    Refresh
                </div>
            </div>

            <div className='mt-10'>
                {/* <RichEditor/>  */}
                <ProductTable products={products} fetchProduct={fetchProducts} />
            </div>



        </div>
    )
}

export default Products