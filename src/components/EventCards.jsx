import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'

const EventCards = ({ event }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    const user = localStorage.getItem("User")
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleRsvp = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("User");

    if (!token || !user) {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/login");
    } else {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/rsvpconfirm");
    }
  }

  const handleProjectApproval = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("User");

    if (!token || !user) {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/login");
    } else {
      api.put("/api/projects/project-status-update", {
        id: event.id,
        status: "approved",
      },).then((res) => {
        console.log(res.data.msg)
        toast.success(res.data.msg)
      }).catch((err) => {
        console.log(err.response.data)
        toast.error(err.response.data.error)
      })
    }

  }

  const handleProjectReject = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("User");

    if (!token || !user) {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/login");
    } else {
      api.put("/api/projects/project-status-update", {
        id: event.id,
        status: "rejected",
      },).then((res) => {
        console.log(res.data.msg)
        toast.success(res.data.msg)
      }).catch((err) => {
        console.log(err.response.data)
        toast.error(err.response.data.error)
      })
    }
  }


  return (
    <div className="p-4 shadow mr-4 mt-4 flex flex-col gap-3 bg-white border border-gray-200 rounded-lg">
      <img src={"https://picsum.photos/400/300?random=3"} alt="project-image" className="rounded-md object-cover w-full h-40" />
      <h3 className="text-gray-900 text-2xl font-bold">{event.title}</h3>
      <p className='text-gray-700'>{event.description}</p>
      <p className='text-gray-500'>Date: {event.year}</p>
      <p className='text-gray-500'>Creator: {event.user_name}</p>
      {user.role === "student" || user.role === undefined ? <button disabled={event.available_seats === 0 || user?.role === "admin"} onClick={handleRsvp} className="bg-indigo-50 text-indigo-700 px-4 py-2 mt-2 rounded-md border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-900">{event.available_seats === 0 ? "No Seats Available" : "View Project"}</button> : <></>}
      {event.status === "pending" && user.role === "admin" ? (
        <div className='flex gap-5'>
          <button onClick={handleProjectReject} className="bg-red-50 text-red-600 px-4 py-2 mt-2 rounded-md border border-red-200 hover:bg-red-100 hover:text-red-800">Reject</button>
          <button onClick={handleProjectApproval} className="bg-green-50 text-green-700 px-4 py-2 mt-2 rounded-md border border-green-200 hover:bg-green-100 hover:text-green-900">Approve</button>
        </div>
      ) : <h2 className="text-gray-500">Status: {event.status}</h2>}
    </div>
  )
}

export default EventCards
