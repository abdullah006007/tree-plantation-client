import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Toaster, toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import useAxios from '../../Hooks/useAxios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to view event details');
      navigate('/login');
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        if (error.response?.status === 400) {
          toast.error('Invalid event ID');
          navigate('/upcoming-events');
        } else if (error.response?.status === 404) {
          toast.error('Event not found');
          navigate('/upcoming-events');
        } else {
          toast.error(error.response?.data?.error || 'Failed to load event details');
        }
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, axiosInstance, navigate, user]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please log in to join the event');
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post('/event-joins', {
        eventId: id,
        userEmail: user.email,
        joinedAt: new Date(),
      });
      toast.success('Successfully joined the event!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to join event');
      console.error('Error joining event:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center text-gray-500">Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{event.title}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-4"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x400')}
        />
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong> {event.eventType}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong>{' '}
            {new Date(event.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-gray-600">
            <strong>Created by:</strong> {event.userEmail}
          </p>
          <button
            onClick={handleJoinEvent}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Join Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;