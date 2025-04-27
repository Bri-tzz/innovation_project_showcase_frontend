import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import api from '../services/api';
import { toast } from 'react-toastify';

const ProposalForm = () => {
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
    setToken(localStorage.getItem("token"));
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [submiting, isSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [event, setEvent] = useState({
    title: "",
    description: "",
    status: "pending",
    year: startDate.getFullYear(),
    image_url: "",
    category: "",
    tags: []
  });

  const options = [
    { value: 'iot', label: 'IoT' },
    { value: 'environment', label: 'Environment' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'security', label: 'Security' },
    { value: 'energy', label: 'Energy' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'ai', label: 'AI' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'education', label: 'Education' },
    { value: 'web', label: 'Web' },
    { value: 'api', label: 'API' },
    { value: 'fitness', label: 'Fitness' },
    { value: '3d', label: '3D' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'data', label: 'Data' },
    { value: 'machine learning', label: 'Machine Learning' },
    { value: 'finance', label: 'Finance' },
    { value: 'wearables', label: 'Wearables' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'automation', label: 'Automation' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'smart home', label: 'Smart Home' }
  ];

  // const handleDateChange = (date) => {
  //   setStartDate(date);
  //   setEvent({
  //     ...event,
  //     event_date: date.toISOString().split('T')[0], // Update date in the event object
  //   });
  // };

  // const handleTimeChange = (e) => {
  //   const time = e.target.value;
  //   setEvent({
  //     ...event,
  //     event_time: time, // Update time in the event object
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSubmitting(true);
    try {
      event.user_id = user.id;
      const response = await api.post("/api/projects/", event);
      toast.success(response.data.message);
      isSubmitting(false);
      // Redirect to the home page or any other page after successful submission  
      window.location.replace(`${window.location.origin}/home`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
      isSubmitting(false);
      // Reset form fields after submission
    setEvent({
      title: "",
      description: "",
      year: startDate.getFullYear(),
      image_url: "",
      category: "",
      tags: []
    });
    }
  };

  const handlePreferencesChange = (selectedOptions) => {
    // Update the event state with selected tags
    setEvent({
      ...event,
      tags: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f8fafc",
      borderColor: "#e63946",
      color: "#22223b",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#e63946",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      color: "#22223b",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#ffccd5" : "#fff",
      color: state.isFocused ? "#e63946" : "#22223b",
      "&:active": {
        backgroundColor: "#ffb3c1",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#22223b",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#ffccd5",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#e63946",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#e63946",
      "&:hover": {
        backgroundColor: "#e63946",
        color: "#fff",
      },
    }),
  };
  //   console.log(user.id);

  return (
    <div className="flex flex-col items-center w-full bg-blue-100 min-h-screen py-8">
      <h1 className="text-4xl text-red-700 font-bold mb-4">Submit A Project Proposal</h1>

      <form
        className="flex gap-4 text-gray-900 w-10/12 border-2 border-red-100 rounded-md p-4 bg-blue-50 shadow-lg"
        onSubmit={handleSubmit}
      >
        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="eventName" className="font-semibold text-red-700">Project Name</label>
            <input
              className="bg-red-50 border-2 border-red-200 rounded-md p-3 focus:outline-red-500"
              type="text"
              id="eventName"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) =>
                setEvent({ ...event, title: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventDescription" className="font-semibold text-red-700">Project Description</label>
            <textarea
              className="bg-red-50 border-2 border-red-200 rounded-md p-3 focus:outline-red-500"
              id="eventDescription"
              placeholder="Event Description"
              value={event.description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventImageUrl" className="font-semibold text-red-700">Project Image URL</label>
            <input
              className="bg-red-50 border-2 border-red-200 rounded-md p-3 focus:outline-red-500"
              type="text"
              id="eventImageUrl"
              placeholder="Event Image URL"
              value={event.image_url}
              onChange={(e) =>
                setEvent({ ...event, image_url: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventCategory" className="font-semibold text-red-700">Project Category</label>
            <input
              className="bg-red-50 border-2 border-red-200 rounded-md p-3 focus:outline-red-500"
              type="text"
              id="eventCategory"
              placeholder="Project Category"
              value={event.category}
              onChange={(e) =>
                setEvent({ ...event, category: e.target.value })
              }
              required
            />
          </div>
        </section>

        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="eventTags" className="font-semibold text-red-700">Project Tags</label>
            <Select
              isMulti
              name="colors"
              options={options}
              onChange={handlePreferencesChange}
              value={options.filter(option => event.tags.includes(option.value))}
              className='w-full'
              styles={customStyles}
              classNamePrefix="select"
            />
          </div>



          <div className="w-[20rem] flex justify-end mt-4">

            <button
              disabled={submiting}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
              type="submit"
            >
              Submit Project
            </button>
          </div>

        </section>
      </form>
    </div>
  );
};

export default ProposalForm;
