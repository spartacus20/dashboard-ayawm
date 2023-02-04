import React, { useState } from 'react'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [completed, setCompleted] = useState(false)
    const emailCompleted = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length > 5) {
            setCompleted(true);
        }
    }

    

    return (
        <div className="mx-auto mt-[150px] bg-[#e3cec7] xl:w-[400px] sm:w-[380px] px-8 py-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-10 text-black">Sign in</h2>
            <input type="email" name="" id="" placeholder="Enter your email address" className="w-full h-[45px] rounded-lg pl-3 border-2 border-black mb-5" onChange={emailCompleted} />
            <input type="password" name="" id="" placeholder="Enter your password" className={completed ? " w-full h-[45px] rounded-lg pl-3 border-2 border-black mb-1 " : "hidden"} onChange={(e) => setPassword(e.target.value)} />
            <button className="py-2 px-4 mt-7  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >Sign in</button>
        </div>
    )
}

export default Login
