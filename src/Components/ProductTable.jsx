import React, { useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import axios from '../Services/axios'
import { delete_product_url } from '../Utils/constants'
import MobileTable from './MobileProductTable'
import { toast } from 'react-toastify'
import EditProduct from './EditProduct'

function ProductTable({ products, fetchProduct }) {

    const [openRowId, setOpenRowId] = useState(null);
    const [productModal, setProductModal] = useState(false)
    const toggleModal = () => {
        setProductModal(!productModal)
    }
    function handleToggle(id) {
        setOpenRowId(openRowId === id ? null : id);
    }

    const handleDelete = (id) => {
        axios.post(delete_product_url, { id }).then((res) => {
            toast.success("Product deleted")
            fetchProduct();
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    const handleEdit = (id) => {
        console.log(id)
        toggleModal();

    }


    // console.log(JSON.parse(products[0].images))   
    // let img = JSON.parse(products[0].images); 

    //  console.log(img[0].url)
    return (
        <>
            <div className='xl:ml-[255px] sm:hidden xl:flex'>

                <table className='border-2 w-[99%] shadow-lg  bg-white '>
                    <tr>
                        <th className='w-20'>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th className='w-28 '>Price</th>
                        <th></th>
                    </tr>
                    {products?.map((product) => {
                        let img = JSON.parse(product.images);
                        img = img[0].url
                        console.log(img);
                        return (
                            <tr className='border-t-2'>
                                <td className='flex items-center justify-center h-[100px] '>{product.id}</td>
                                <td className='w-[150px] px-5 py-2'><img src={img} alt="" className='w-[100px] h-[100px] object-cover' /></td>
                                <td className='w-100 font-bold'>{product.title}</td>
                                <td className='w-28 flex justify-center -[100px]'>{product.price} €</td>
                                <td className='px-14 justify-center'>
                                    <div className='flex font-semibold items-center bg-[#EDF2F7] w-[100px] px-3 rounded-lg' onClick={() => handleToggle(product.id)}>
                                        Actions
                                        {openRowId === product.id ? <AiOutlineUp size={14} className='ml-2' /> : <AiOutlineDown className='ml-2' />}
                                    </div>
                                    {openRowId === product.id && (
                                        <div className='bg-[#EDF2F7]  w-[100px] p-3 rounded-lg shadow-lg mt-1 absolute'>
                                            <div className='mb-2 hover:font-bold cursor-pointer' onClick={handleEdit}>Edit</div>
                                            <EditProduct productID={product.id} fetchProducts={fetchProduct} productModal={productModal} toggleModal={toggleModal}/>
                                            <div className='hover:font-bold cursor-pointer' onClick={() => handleDelete(product.id)}>Delete</div>
                                        </div>
                                    )}



                                </td>
                            </tr>
                        )
                    })}
                </table>


            </div>
            <div className=' xl:hidden sm:flex sm:flex-col w-[100%] px-4'>

                <div className="flex items-center justify-between px-3 font-bold  w-[98%] min-h-[50px] border-b-2 border-black mb-2">
                    <h3>Id</h3>
                    {/* <h3>Image</h3> */}
                    <h3>Name</h3>
                    <h3>Price</h3>


                </div>
                {products?.map((product) => (<MobileTable product={product} />))}
            </div>

        </>

    )
}

export default ProductTable