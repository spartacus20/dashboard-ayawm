import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { actionTypes } from '../Context/Reducers/UserReducer';
import { useUserValue } from '../Context/userContext';

function Login() {

    const [{ user }, dispatch] = useUserValue();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [completed, setCompleted] = useState(false)
    const emailCompleted = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length > 5) {
            setCompleted(true);
        }
    }
    const cookies = new Cookies();

    // useEffect(() => {
    //     if(cookies.get('jid') !== undefined){
    //         window.location.href = "/"; 
    //     }
    // }, []); 



    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email.length)
        console.log(password.length)

        if(email.length > 0 || password.length > 0 || email.length > 0 && password.length > 0 ) {
            dispatch({ type: actionTypes.LOGIN, payload: { email, password } })
            // console.log(user)
        }else{ 
            toast.error("Please fill in all the fields"); 
        }


    }

    return (
        <div className="mx-auto mt-[150px] shadow-lg bg-[#FFFFFF] xl:w-[400px] sm:w-[380px] px-8 py-6 rounded-xl">

            <h2 className="text-2xl font-semibold mb-10 text-black text-center">AYAWMA</h2>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="">Email</label>
                <input type="email" name="" id="" placeholder="Enter your email address" className="w-full h-[45px] rounded-lg pl-3  border-black mb-5 mt-2 bg-[#EDF2F7] border-0" onChange={emailCompleted} />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" placeholder="Enter your password" className="w-full h-[45px] rounded-lg pl-3  border-black mb-5 mt-2 bg-[#EDF2F7] border-0" onChange={(e) => setPassword(e.target.value)} />
                <button className="py-2 px-4 mt-7  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "  >Login</button>
            </form>
        </div>
    )
}

export default Login
