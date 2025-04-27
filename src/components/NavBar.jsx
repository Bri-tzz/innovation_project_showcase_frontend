import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoEnterOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { logout } from '../services/api';

const NavBar = () => {
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("User")))
    }, [])
    // const [test, setTest] = useState(true)
    const [user, setUser] = useState({})
    return (
        <nav className='bg-blue-50 text-gray-900 flex justify-between p-4 shadow-md border-b-2 border-red-200'>
            <div className='flex gap-2 items-center'>
                <GrProjects className="text-red-600" />
                <h1 className="text-xl font-bold">Project Portal</h1>
            </div>

            {
                user ?
                    <div className='flex items-center gap-5'>
                        {
                            user.role === "admin" ? <Link className="mx-2 hover:text-blue-600" to="/admin">Dashboard</Link> : <></>
                        }
                        {
                            user.role === "student" ? <Link className="mx-2 hover:text-blue-600" to="/home">Home</Link> : <></>
                        }
                        {
                            user.role === "student" ? <Link className="mx-2 hover:text-blue-600" to="/myevents">My Projects</Link> : <></>
                        }{
                            user.role === "student" ? <Link className="mx-2 hover:text-blue-600" to="/calendar">New Proposal</Link> : <></>
                        }
                        {
                            user ? <button onClick={logout} className="ml-2 px-4 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200">Logout</button> : <></>
                        }
                    </div> :
                    <></>
            }

            <div className='flex gap-3'>
                {
                    user ?
                        <>
                            <img className='rounded-full size-9' src="ProfilePic.png" alt="profilePicture" />
                        </>
                        : <>
                            <Link className="px-7 py-1.5 text-white bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700" to='/signup'><MdOutlineAttachEmail />Sign Up</Link>
                            <Link className="px-7 py-1.5 text-blue-600 bg-white border border-blue-600 rounded-md flex items-center justify-center gap-2 hover:bg-blue-50" to='/login'><IoEnterOutline />Log In</Link>
                        </>
                }
            </div>
        </nav>
    )
}

export default NavBar
