import React from 'react'

function MobileTable({ product }) {
  return (

    <div className="xl:hidden sm:flex w-[98%] min-h-[100px] border-t-2">
      <div className='flex items-center justify-center min-h-[100px] w-[20px] mr-1'>
        {product.id}
      </div>
      <div className='flex items-center'>
        <img src={product.image} alt={product.name} className="w-[60px] h-[60px]" />
      </div>
      <div className='w-[220px] px-2'>
        {product.title}
      </div>
      <div className='flex flex-col min-h-[100%]'>
        <div className='h-[50%] flex items-center justify-center'>
          {product.price}
        </div>
        <div className='h-[50%] flex items-center justify-center'>
          <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
        </div>

      </div>

    </div>

  )
}

export default MobileTable