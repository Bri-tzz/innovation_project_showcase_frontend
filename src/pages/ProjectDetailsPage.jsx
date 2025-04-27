import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import { MdDateRange } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import api from '../services/api';
import { Hourglass } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setEventDetails(JSON.parse(localStorage.getItem("Event")))
    setUserDetails(JSON.parse(localStorage.getItem("User")))
  }, [])

  const [eventDetails, setEventDetails] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const [comments, setComments] = useState([
    { user: 'Joshua', text: 'Great project!' },
    { user: 'Tracy', text: 'Looking forward to seeing more.' }
  ]);
  const [newComment, setNewComment] = useState('');

  const onClick = () => {
    const upcomingSection = document.getElementById('event-details-section');
    if (upcomingSection) {
      upcomingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // const handleConfirm = async () => {
  //   setIsConfirmed(true);
  //   try {
  //     const response = await api.post(`/api/events/rsvp/confirm`, {
  //       event_id: eventDetails.id,
  //       user_id: userDetails.id,
  //     })
  //     setIsConfirmed(false);
  //     toast.success(response.data.message)
  //   } catch (error) {
  //     setIsConfirmed(false);
  //     if (error.response.data.error === "Event is already full") {
  //       toast.error("Event is already full")
  //     } else if (error.response.data.error === "User has already RSVP'd for this event") {
  //       toast.error("User has already RSVP'd for this event")
  //     } else {
  //       toast.error("Error confirming RSVP")
  //     }
  //     console.log(error)
  //   }
  // }

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { user: userDetails.name || 'Anonymous', text: newComment }]);
      setNewComment('');
    }
  };

  // console.log(eventDetails)
  // console.log(userDetails)
  return (
    <div>
      <NavBar />
      {/* <Banner
        title="Empowering Innovators"
        subtitle="Transforming ideas into impactful solutions."
        linkText="Learn More"
        onClick={onClick}
        backgroundImage="image.png"
      /> */}
      <main className="bg-blue-100 min-h-screen">
        <section className="flex flex-col md:flex-row gap-8 px-8 py-12 max-w-7xl mx-auto">
          {/* Left: Project Details */}
          <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-md">
            <h1 className="font-bold text-3xl md:text-4xl mb-6 text-red-700">Project Details</h1>
            <div className='mb-4'>
              <h1 className='text-3xl text-red-700'>Title: {eventDetails.title}</h1>
              <p className='text-lg text-gray-500'>Owner: {eventDetails.user_name}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-1 text-red-700">Background:</h2>
              <p className="text-gray-700 mb-3">{eventDetails.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur, lorem nec euismod sodales, ex dolor laoreet sem.'}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-1 text-red-700">Objective:</h2>
              <p className="text-gray-700 mb-3">{eventDetails.objective || 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-1 text-red-700">Method:</h2>
              <p className="text-gray-700 mb-3">{eventDetails.method || 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.'}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-1 text-red-700">Outcomes:</h2>
              <p className="text-gray-700 mb-3">{eventDetails.outcomes || 'Outcomes: Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.'}</p>
            </div>
          </div>
          {/* Right: Images */}
          <div className="flex-1 flex flex-col gap-4">
            <img src={eventDetails.image1 || 'https://picsum.photos/400/300?random=1'} alt="Project 1" className="rounded-lg object-cover w-full h-40 md:h-48 bg-blue-50" />
            <img src={eventDetails.image2 || 'https://picsum.photos/400/300?random=5'} alt="Project 2" className="rounded-lg object-cover w-full h-40 md:h-48 bg-blue-50" />
            <img src={eventDetails.image3 || 'https://picsum.photos/400/300?random=6'} alt="Project 3" className="rounded-lg object-cover w-full h-40 md:h-48 bg-blue-50" />
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-blue-50 max-w-7xl mx-auto px-8 pb-12 rounded-lg shadow-md pt-5">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Comments</h2>
          <div className="flex flex-col gap-4 mb-6">
            {comments.length === 0 && <p className="text-gray-400">No comments yet. Be the first to comment!</p>}
            {comments.map((comment, idx) => (
              <div key={idx} className="bg-blue-100 rounded-lg p-4">
                <span className="font-semibold text-red-700">{comment.user}:</span>
                <span className="text-gray-900 ml-2">{comment.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 rounded-md bg-blue-100 text-gray-900 border border-blue-200 focus:outline-red-500"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <button
              onClick={handleAddComment}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Post
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectDetailsPage
