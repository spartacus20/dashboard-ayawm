import React from 'react'

function DashboardCard({ text, number, icon }) {
    return (
        <div className='flex h-20 xl:w-[230px] sm:w-[60%] sm:ml-[20%] xl:ml-0 sm:mb-4 rounded-xl px-3 items-center justify-between bg-white shadow-md'>
            <div className='flex flex-col justify-start items-center'>
                <h3 className='text-gray-700'>{text}</h3>
                <span className=' text-left font-bold'>{number}</span>
            </div>
            <div className='flex  items-center justify-center bg-blue-700 rounded-xl text-white h-[80%] w-[70px] '>
                {icon}
            </div>
        </div>
    )
}

export default DashboardCard