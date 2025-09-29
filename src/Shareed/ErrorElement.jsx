// ErrorElement.jsx
import React from 'react';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center max-w-md">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. The page you're looking for might not exist or an error occurred.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <FaHome /> Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <FaRedo /> Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
