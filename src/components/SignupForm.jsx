import React from 'react'
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { signup } from '../services/api';
import { TbGridDots } from "react-icons/tb";
import { Hourglass } from 'react-loader-spinner';
import { toast } from 'react-toastify';
const SignupForm = () => {
    const options = [
        { value: 'Workshops', label: 'Workshops' },
        { value: 'Seminars', label: 'Seminars' },
        { value: 'Club activities', label: 'Club Activities' },
    ]

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        roll_no: "",
    })
    const [isLoading, setIsLoading] = useState(false);

    // const customStyles = {
    //     control: (base) => ({
    //         ...base,
    //         backgroundColor: "rgba(50, 56, 66, 1)",
    //         borderColor: "transparent",
    //         color: "#fff",
    //         boxShadow: "none",
    //         "&:hover": {
    //             borderColor: "transparent",
    //         },
    //     }),
    //     menu: (base) => ({
    //         ...base,
    //         backgroundColor: "rgba(50, 56, 66, 1)",
    //         color: "#fff",
    //     }),
    //     option: (base, state) => ({
    //         ...base,
    //         backgroundColor: state.isFocused ? "rgba(0, 204, 255, 0.2)" : "rgba(50, 56, 66, 1)",
    //         color: state.isFocused ? "#fff" : "#ccc",
    //         "&:active": {
    //             backgroundColor: "rgba(0, 204, 255, 0.4)",
    //         },
    //     }),
    //     singleValue: (base) => ({
    //         ...base,
    //         color: "#fff",
    //     }),
    //     multiValue: (base) => ({
    //         ...base,
    //         backgroundColor: "rgba(0, 204, 255, 0.3)",
    //     }),
    //     multiValueLabel: (base) => ({
    //         ...base,
    //         color: "#fff",
    //     }),
    //     multiValueRemove: (base) => ({
    //         ...base,
    //         color: "#fff",
    //         "&:hover": {
    //             backgroundColor: "rgba(0, 204, 255, 0.5)",
    //             color: "#000",
    //         },
    //     }),
    // };


    const handleSignup = async (e) => {
        e.preventDefault();
        if (userDetails.password !== userDetails.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const finalUserDetails = {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            role: "student",
            roll_no: userDetails.roll_no
        }

        // console.log(finalUserDetails);
        try {
            setIsLoading(true);
            await signup(finalUserDetails)
            setIsLoading(false);
        } catch (error) {
            // console.error('Signup failed:', error.response ? error.response.data : error.message);
            console.log('Signup failed:', error)
            toast.error("An error occurred when tryiing to signup")
            setIsLoading(false);
            setUserDetails({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                roll_no: ""
            })
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
                <h1 className='text-red-700 text-3xl font-bold'>Create Account</h1>
                <p className='text-gray-700'>Create an account to manage your projects.</p>
                <form onSubmit={handleSignup} className='text-gray-900 flex flex-col gap-3 w-full p-6'>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="name"><CiUser className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="text" id="name" name="name" value={userDetails.name} placeholder='Enter your name' required />
                    </div>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="roll_no"><CiUser className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, roll_no: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="text" id="roll_no" name="roll_no" value={userDetails.roll_no} placeholder='Enter your roll number' required />
                    </div>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="email"><CiMail className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="email" id="email" name="email" value={userDetails.email} placeholder='Enter an email' required />
                    </div>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="password"><GiPadlock className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="password" id="password" name="password" value={userDetails.password} placeholder='Enter your password' required />
                    </div>
                    <div className='flex items-center gap-2 p-2 bg-red-50 rounded-md'>
                        <label htmlFor="confirmPassword"><GiPadlock className='text-red-600' /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} className='bg-transparent w-full p-2 focus:outline-none' type="password" id="confirmPassword" name="confirmPassword" value={userDetails.confirmPassword} placeholder='Enter your password again' required />
                    </div>
                    <button type='submit' className='px-4 py-3 text-white bg-red-600 rounded-md flex justify-center hover:bg-red-700'>{isLoading ? <Hourglass
                        visible={true}
                        height="32"
                        width="32"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#e63946', '#4cc9f0']}
                    /> : "Sign Up"}</button>
                    <p className='text-center text-gray-700'>Already registered?<Link className='text-blue-500 hover:text-blue-700 ml-1' to='/login'> Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
