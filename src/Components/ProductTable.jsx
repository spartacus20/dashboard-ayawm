import React from 'react'
import MobileTable from './MobileProductTable'

function ProductTable({ products }) {
    console.log(products)   
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
                        return (
                            <tr className='border-t-2'>
                                <td className='flex items-center justify-center h-[100px] '>{product.id}</td>
                                <td className='w-[150px] px-5 py-2'><img src={product.image} alt="" className='w-[100px] h-[100px] object-cover' /></td>
                                <td className='w-100 font-bold'>{product.title}</td>
                                <td className='w-28 flex justify-center -[100px]'>{product.price} €</td>
                                <td className='px-14 justify-center'><button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button></td>
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