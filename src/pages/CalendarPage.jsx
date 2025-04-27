import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import NavBar from '../components/NavBar';
import api from '../services/api';  // Ensure api is correctly set up to make HTTP requests
import Select from 'react-select'; // Import react-select
import { useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner'
import { toast } from 'react-toastify';
const locales = {
    'en-US': enUS,
};

// Localizer setup for  date formatting
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarPage = () => {
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("User"));
        setUserDetails(userDetails);
        getAllEvents();
    }, []);

    const [events, setEvents] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [dateSelected, setDateSelected] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // Event handler for selecting a date
    const handleSelect = (slotInfo) => {
        setDateSelected(slotInfo.start); // Store the selected date
        filterEventsByDate(slotInfo.start);
    };

    // Event handler for clicking an event
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        alert(`Event: ${event.title}`);
    };

    // Fetch all events from the backend API
    const getAllEvents = async () => {
        try {
            const response = await api.get("/api/events/allevents");

            // Transform the event data to be compatible with react-big-calendar
            const transformedEvents = response.data.events.map(event => ({
                title: event.name,
                start: new Date(`${event.event_date}T${event.event_time}`), // Combine date and time to form a Date object
                end: new Date(`${event.event_date}T${event.event_time}`),  // Assuming events are all-day or don't span multiple days
                allDay: false, // Set this to true if the event is an all-day event
                description: event.description,
                location: event.location,
                capacity: event.capacity,
                available_seats: event.available_seats,
                type: event.type,
                id: event.id,
            }));

            setEvents(transformedEvents);  // Set transformed events into the state
        } catch (error) {
            console.error("Error fetching all events:", error);
        }
    };

    const handleRsvp = async (eventId) => {
        setIsLoading(true);
        try {
            const response = await api.post(`/api/events/rsvp/confirm`, { event_id: eventId, user_id: userDetails.id });
            if (response.data.error === "Event is full") {
                toast.error("Event is full");
            } else if (response.data.error === "User has already RSVP'd for this event") {
                toast.error("You have already RSVP'd for this event");
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            console.error("Error RSVPing to event:", error);
        } finally {
            setIsLoading(false);
        }
    }
    // console.log(userDetails);

    // Filter events by selected date
    const filterEventsByDate = (date) => {
        const filtered = events.filter(event => {
            const eventDate = event.start.toISOString().split('T')[0]; // Extract the date part
            const selectedDate = date.toISOString().split('T')[0]; // Extract the date part
            return eventDate === selectedDate; // Compare the date part
        });
        setFilteredEvents(filtered);  // Update the filtered events state
    };

    // Filter events by selected type
    const handleFilterChange = (selectedOption) => {
        setSelectedFilter(selectedOption);
        if (selectedOption) {
            const filteredByType = filteredEvents.filter(event => event.type === selectedOption.value);
            setFilteredEvents(filteredByType);
        } else {
            filterEventsByDate(dateSelected); // Reset the filter
        }
    };

    // Create the filter options for react-select
    const eventTypes = [
        ...new Set(events.map(event => event.type)), // Get unique event types
    ].map(type => ({ label: type, value: type }));

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "#f8fafc",
            borderColor: "#6366f1",
            color: "#22223b",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#6366f1",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#fff",
            color: "#22223b",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#e0e7ff" : "#fff",
            color: state.isFocused ? "#4338ca" : "#22223b",
            "&:active": {
                backgroundColor: "#c7d2fe",
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: "#22223b",
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#e0e7ff",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#4338ca",
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "#4338ca",
            "&:hover": {
                backgroundColor: "#6366f1",
                color: "#fff",
            },
        }),
    };



    return (
        <div>
            <NavBar />
            <div className="p-4 bg-white text-gray-900 border-t-2 border-indigo-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-indigo-700">Calendar Page</h1>
                {/* Calendar */}
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, background: '#fff', color: '#22223b' }}
                    selectable
                    onSelectSlot={handleSelect}
                    onSelectEvent={handleEventClick}
                    className='bg-white text-gray-900 border border-indigo-100 rounded-md'
                />
                <div className='border-t-2 border-indigo-100 bg-white h-full w-full'>
                    {/* Filter */}
                    {dateSelected && (
                        <div className="mt-4 ">
                            <div className='flex justify-between gap-4 w-full border-b-2 border-indigo-100 items-center p-3'>
                                <h2 className="text-xl font-semibold mb-2 text-indigo-700">Events for {dateSelected.toDateString()}</h2>
                                {/* React Select Filter for Event Type */}
                                <div className='flex justify-end'>
                                    <Select
                                        options={eventTypes}
                                        onChange={handleFilterChange}
                                        placeholder="Filter by Event Type"
                                        value={selectedFilter}
                                        styles={customStyles}
                                        isClearable
                                        className='w-full'
                                    />
                                </div>
                            </div>
                            {/* List of Events */}
                            {filteredEvents.length > 0 ? (
                                <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                                    <ul>
                                        {filteredEvents.map(event => (
                                            <li key={event.id} className="mb-2 flex flex-col gap-4">
                                                <div className="font-semibold text-xl text-indigo-700">{event.title}</div>
                                                <div className="text-gray-700">{event.description}</div>
                                                <div className="text-gray-500">{event.location}</div>
                                                <div className='flex justify-end w-full'>
                                                    <button disabled={isLoading} onClick={() => handleRsvp(event.id)} className='bg-indigo-50 text-indigo-700 px-4 py-2 mt-2 rounded-md border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-900'>{isLoading ? <Hourglass
                                                        visible={true}
                                                        height="20"
                                                        width="20"
                                                        ariaLabel="hourglass-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        colors={['#6366f1', '#a5b4fc']}
                                                    /> : "RSVP"}</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-gray-500">No events for this date</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
