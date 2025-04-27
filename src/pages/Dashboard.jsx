import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import EventCards from '../components/EventCards'
import { Hourglass } from 'react-loader-spinner';
import api from '../services/api'
const Dashboard = () => {
    // const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const onClick = () => {
        const upcomingSection = document.getElementById('upcoming-section');
        if (upcomingSection) {
            upcomingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getAllProjects();
        setUser(JSON.parse(localStorage.getItem("User")))
    }, []);

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
            {/* <Banner
                title={`Welome ${user.name}`}
                subtitle="Empowering Your Campus Experience"
                linkText="Get Started"
                onClick={onClick}
                backgroundImage="DashboardBanner.png"
            /> */}

            <main>
                <section className='bg-blue-50 flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-red-700 font-bold text-center mb-6'>All Projects</h1>
                    <div className='grid grid-cols-2 gap-5'>
                        {
                            isLoading ? <div className='flex justify-center mt-5'> <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#e63946', '#4cc9f0']}
                            /></div> : projects
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

export default Dashboard
