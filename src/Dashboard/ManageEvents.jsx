import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';

import { Toaster, toast } from 'react-hot-toast';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useAxios from '../Hooks/useAxios';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [eventDate, setEventDate] = useState(null);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Other'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.error('Please log in to manage your events');
        navigate('/login');
        setLoading(false);
        return;
      }
      console.log('Authenticated user email:', currentUser.email); // Debug log
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (!user || !user.email) {
      console.log('No user or user.email, skipping fetchMyEvents');
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        console.log('Fetching events for userEmail:', user.email); // Debug log
        const response = await axiosInstance.get('/events/my-events', {
          params: { userEmail: user.email },
        });
        console.log('Fetched events:', response.data); // Debug log
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error, {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });
        if (error.response?.status === 400) {
          toast.error(error.response?.data?.error || 'Invalid request: user email is required');
        } else if (error.response?.status === 500) {
          toast.error(error.response?.data?.error || 'Server error: Failed to load events');
        } else {
          toast.error('Failed to load your events');
        }
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [axiosInstance, user, navigate]);

  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  const handleEditEvent = (event) => {
    if (!event._id || !isValidObjectId(event._id)) {
      toast.error('Invalid event ID');
      console.error('Invalid event ID in handleEditEvent:', event._id);
      return;
    }
    console.log('Editing event with ID:', event._id); // Debug log
    setEditingEvent(event);
    setValue('title', event.title);
    setValue('description', event.description);
    setValue('eventType', event.eventType);
    setValue('thumbnail', event.thumbnail);
    setValue('location', event.location);
    setEventDate(new Date(event.date));
    setValue('date', new Date(event.date));
  };

  const handleUpdateEvent = async (data) => {
    if (!eventDate) {
      toast.error('Event date is required');
      return;
    }
    if (!editingEvent?._id || !isValidObjectId(editingEvent._id)) {
      toast.error('Invalid event ID for update');
      console.error('Invalid event ID in handleUpdateEvent:', editingEvent?._id);
      return;
    }

    const updatedEventData = {
      title: data.title,
      description: data.description,
      eventType: data.eventType,
      thumbnail: data.thumbnail,
      location: data.location,
      date: eventDate,
      userEmail: user.email,
    };

    try {
      console.log('Updating event with ID:', editingEvent._id); // Debug log
      await axiosInstance.put(`/events/${editingEvent._id}`, updatedEventData);
      toast.success('Event updated successfully!');
      setEvents(events.map((e) => (e._id === editingEvent._id ? { ...e, ...updatedEventData } : e)));
      setEditingEvent(null);
      reset();
      setEventDate(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update event');
      console.error('Error updating event:', error, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!eventId || !isValidObjectId(eventId)) {
      toast.error('Invalid event ID');
      console.error('Invalid event ID in handleDeleteEvent:', eventId);
      return;
    }
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      console.log('Deleting event with ID:', eventId); // Debug log
      await axiosInstance.delete(`/events/${eventId}`, {
        params: { userEmail: user.email },
      });
      toast.success('Event deleted successfully!');
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete event');
      console.error('Error deleting event:', error, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    reset();
    setEventDate(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage My Events</h1>

      {editingEvent ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8  ">
          <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
          <form onSubmit={handleSubmit(handleUpdateEvent)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Description must be at least 10 characters' } })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                {...register('eventType', { required: 'Event type is required' })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
              <input
                type="url"
                {...register('thumbnail', { required: 'Thumbnail URL is required', pattern: { value: /^https?:\/\/.+$/, message: 'Enter a valid URL' } })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                {...register('location', { required: 'Location is required', minLength: { value: 3, message: 'Location must be at least 3 characters' } })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Date</label>
              <DatePicker
                selected={eventDate}
                onChange={(date) => {
                  setEventDate(date);
                  setValue('date', date, { shouldValidate: true });
                }}
                minDate={new Date()}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                dateFormat="yyyy-MM-dd"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {events.length === 0 ? (
            <p className="text-center text-gray-500">You haven't created any events yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.src = 'https://placehold.co/300x200')}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                    <p className="text-gray-600 mt-1">{event.location}</p>
                    <p className="text-gray-500 text-sm mt-1">Type: {event.eventType}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Date:{' '}
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageEvents;