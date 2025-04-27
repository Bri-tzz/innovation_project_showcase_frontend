import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../services/api';

const UserProjectCards = ({ event, onClick }) => {
  // const navigate  = useNavigate()
  const handleRsvp = async () => {
    localStorage.setItem("Event", JSON.stringify(event))
    onClick()
  }

  return (
    <div className="p-4 shadow mr-4 mt-4 flex flex-col gap-3 bg-white border border-indigo-100 rounded-lg">
      <img src="https://picsum.photos/400/300?random=10" alt="project-image" className="rounded-md object-cover w-full h-32 bg-indigo-50" />
      <h3 className="text-indigo-700 text-2xl font-bold">{event.title}</h3>
      <p className='text-gray-700'>{event.description}</p>
      <p className='text-gray-500'>Date : {event.year}</p>
      <p className='text-gray-500'>Tags: {event.tags.map((tag, index) => <span key={index}>{` ${tag}, `}</span>)}</p>
      <p className='text-gray-500'>Category: {event.category}</p>
      {event.status !=="pending"?<button onClick={handleRsvp} className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-md border border-indigo-200 hover:bg-indigo-100 hover:text-black">View Project</button>:<p>Status: {event.status}</p>}
    </div>
  )
}

export default UserProjectCards
