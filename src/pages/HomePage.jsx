import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import EventCards from '../components/EventCards'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import api from '../services/api'
import { Hourglass } from 'react-loader-spinner'

const HomePage = () => {
    useEffect(() => {
        getAllProjects()
    }, [])

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const onClick = () => {
        const featuredProjectSection = document.getElementById('featured-project');
        if (featuredProjectSection) {
            featuredProjectSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

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
            <Banner
                title="Fostering Creativity"
                subtitle="Uncover pioneering projects that are defining tomorrow."
                linkText="Browse Projects"
                onClick={onClick}
                backgroundImage="https://picsum.photos/400/300?random=2"
            />

            <main>

                <section id='featured-project' className='bg-blue-50 flex flex-col justify-center px-10 py-10'>
                    <h1 className="font-bold text-red-700 text-4xl mt-2 mb-4 text-center">Recent Projects</h1>
                    <div className='grid grid-cols-2 gap-5'>
                        {
                            isLoading ? <div className='flex justify-center items-center w-full h-full mt-5'> <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#e63946', '#4cc9f0']}
                            /></div> : projects.length === 0 ? <p className=' text-center uppercase font-bold text-gray-500 text-2xl'>No projects found.</p> : projects
                                .filter(project => project.status === "approved")
                                .map((project, index) => (
                                    <EventCards key={index} event={project} />
                                ))
                        }
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    )
}

export default HomePage
