import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import EventCards from '../components/EventCards'
import api from '../services/api'
import { Hourglass } from 'react-loader-spinner';

const AdminPage = () => {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = localStorage.getItem("User")
        if (user) {
            setUser(JSON.parse(user))
        }
        getAllProjects();
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    const getAllProjects = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/api/projects");
            setProjects(response.data.projects);
        } catch (error) {
            console.error("Error fetching all events:", error);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
            <NavBar />
            <main className='min-h-screen bg-blue-100'>
                <section className='border-b-2 border-red-100 bg-blue-50 flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-red-700 font-bold mb-6'>Recently Submitted Projects</h1>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            isLoading ? <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#e63946', '#4cc9f0']}
                            /> : projects.length === 0 ? <p className='text-center uppercase font-bold text-gray-500 text-2xl'>No projects found.</p> : projects
                                .filter(project => project.status === "pending")
                                .map((project, index) => (
                                    <EventCards key={index} event={project} />
                                ))
                        }
                    </div>
                </section>

                <section className='bg-blue-200 flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-red-700 font-bold mb-6'>Past Projects</h1>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            projects.length === 0 ? <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#e63946', '#4cc9f0']}
                            /> : projects
                                .filter(project => project.status === "approved" || project.status === "rejected")
                                .map((event, index) => (
                                    <EventCards key={index} event={event} />
                                ))
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminPage
