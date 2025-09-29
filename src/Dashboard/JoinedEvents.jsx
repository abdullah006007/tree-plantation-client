import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toaster, toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import useAxios from '../Hooks/useAxios';

const JoinedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to view joined events');
      navigate('/login');
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        const response = await axiosInstance.get('/event-joins/my-events', {
          params: { userEmail: user.email },
        });
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load joined events');
        console.error('Error fetching joined events:', error);
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [axiosInstance, navigate, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Joined Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">You haven't joined any events yet.</p>
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
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200')}
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
                <button
                  onClick={() => navigate(`/event/${event._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;