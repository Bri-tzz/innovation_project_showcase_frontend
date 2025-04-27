import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Hourglass } from 'react-loader-spinner';
import api from '../services/api';
import UserProjectCards from '../components/UserProjectCards';
import CancelDialoguebox from '../components/CancelDialoguebox';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserEventsPage = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [cancelDialogue, setCancelDialogue] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("User"));
        if (storedUser) {
            setUser(storedUser); // This will update the state
        }
    }, []); // Only runs once on component mount

    useEffect(() => {
        if (user?.id) { // Wait until user is properly set
            getUserEvents();
        }
    }, [user]); // Runs when the `user` state changes
const navigate = useNavigate()
    const getUserEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/api/projects/${user.id}`);
            setProjects(response.data.projects);
        } catch (error) {
            console.error("Error fetching user events:", error);
        } finally {
            setIsLoading(false);
        }
    };
   

    // const handleClose = () => {
    //     setCancelDialogue(false)
    // }

    return (
        <div>
            <NavBar />
            <main className='min-h-screen bg-white px-10'>
                <h1 className='text-4xl text-indigo-700 font-bold mb-6'>My Projects</h1>
                <p className='pt-5 text-gray-700 font-semibold'>Pending Projects</p>
                <div className='grid grid-cols-3 gap-5 items-center'>
                    {isLoading ? (
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#6366f1', '#a5b4fc']}
                        />
                    ) : projects.length === 0 ? (
                        <p className='text-gray-500'>No projects found.</p>
                    ) : (
                        projects
                            .filter(project => project.status === 'pending')
                            .map((project, index) => (
                                <UserProjectCards key={index} event={project} onClick={() => {
                                    setCancelDialogue(true)
                                }} />
                            ))
                    )}
                </div>

                <p className='pt-5 text-gray-700 font-semibold'>Approved Projects</p>
                <div className='grid grid-cols-3 gap-5 items-center'>
                    {isLoading ? (
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#6366f1', '#a5b4fc']}
                        />
                    ) : projects.filter(project => project.status === 'approved').length === 0 ? (
                        <p className='text-gray-500'>No projects found.</p>
                    ) : (
                        projects
                            .filter(project => project.status === 'approved')
                            .map((project, index) => (
                                <UserProjectCards key={index} event={project} onClick={() => {
                                    navigate("/rsvpconfirm")
                                }} />
                            ))
                    )}
                </div>

                <p className='pt-5 text-gray-700 font-semibold'>Rejected Projects</p>
                <div className='grid grid-cols-3 gap-5 items-center'>
                    {isLoading ? (
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#6366f1', '#a5b4fc']}
                        />
                    ) : projects.filter(project => project.status === 'rejected').length === 0 ? (
                        <p className='text-gray-500'>No projects found.</p>
                    ) : (
                        projects
                            .filter(project => project.status === 'rejected')
                            .map((project, index) => (
                                <UserProjectCards key={index} event={project} onClick={() => {
                                    setCancelDialogue(true)
                                }} />
                            ))
                    )}
                </div>
                {/* {cancelDialogue && <CancelDialoguebox onClick={handleCancel} onClose={handleClose} isDeleted={isDeleted} />} */}
            </main>
        </div>
    );
};

export default UserEventsPage;
