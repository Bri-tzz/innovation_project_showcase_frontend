import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { Hourglass } from 'react-loader-spinner';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await login(userDetails)
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
            console.error('Login failed:', error);
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center' style={{
            backgroundImage: "url(landscape2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className='bg-blue-50 w-full max-w-md flex flex-col items-center gap-3 pt-10 rounded-lg shadow-lg border border-red-100'>
                <h1 className='text-red-700 text-3xl font-bold'>Access Account</h1>
                <p className='text-gray-700'>Access your account to manage events.</p>
                <form onSubmit={handleLogin} className='text-gray-900 flex flex-col gap-3 w-full p-6'>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="email"><CiMail className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="email" id="email" name="email" value={userDetails.email} placeholder='Enter an email' required />
                    </div>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="password"><GiPadlock className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="password" id="password" name="password" value={userDetails.password} placeholder='Enter your password' required />
                    </div>
                    <div className='flex justify-end'>
                        <Link to='/' className='text-blue-500 hover:text-blue-700'>Forget your password?</Link>
                    </div>
                    <button type='submit' className='px-4 py-3 text-white bg-red-600 rounded-md flex justify-center hover:bg-red-700'>{isLoading ? <Hourglass
                        visible={true}
                        height="32"
                        width="32"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#e63946', '#4cc9f0']}
                    /> : "Login"}</button>
                    <p className='text-center text-gray-700'>Need to create an account?<Link className='text-blue-500 hover:text-blue-700 ml-1' to='/signup'> Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
