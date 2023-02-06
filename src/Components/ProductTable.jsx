import React from 'react'


function ProductTable({products}) {
    console.log(products)
  return (
    <div className='xl:ml-[255px]'>
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
  )
}

export default ProductTable