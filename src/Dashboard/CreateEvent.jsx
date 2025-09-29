import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'react-hot-toast';

import { getAuth } from 'firebase/auth';
import useAxios from '../Hooks/useAxios';

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const [eventDate, setEventDate] = useState(null);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const auth = getAuth();
  const user = auth.currentUser;

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Other'];

  const onSubmit = async (data) => {
    if (!eventDate) {
      setError('date', { type: 'manual', message: 'Event date is required' });
      return;
    }

    const eventData = {
      title: data.title,
      description: data.description,
      eventType: data.eventType,
      thumbnail: data.thumbnail,
      location: data.location,
      date: eventDate,
      userEmail: user?.email || 'anonymous',
    };

    console.log('Sending event data:', eventData); // Debug log

    try {
      const response = await axiosInstance.post('/events', eventData);
      toast.success('Event created successfully!');
      setTimeout(() => navigate('/upcoming-events'), 1500);
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to create event');
      }
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;