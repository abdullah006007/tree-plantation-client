import React from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Create Your Own Events',
      description: 'Organize community-driven events like tree planting, cleanups, or donation drives with ease. Add details such as title, description, location, and date to inspire others.',
      icon: '🌳',
      color: 'bg-green-100',
      buttonText: 'Start Creating',
      buttonPath: '/dashboard/create-event',
    },
    {
      title: 'Manage Your Events',
      description: 'Easily update or delete your events to keep your community engaged. Maintain full control over your event details and schedules.',
      icon: '📋',
      color: 'bg-blue-100',
      buttonText: 'Manage Now',
      buttonPath: '/manage-events',
    },
    {
      title: 'Join Community Events',
      description: 'Discover and join events created by others. Participate in meaningful activities and connect with like-minded individuals in your community.',
      icon: '🤝',
      color: 'bg-yellow-100',
      buttonText: 'Explore Events',
      buttonPath: '/events/upcoming',
    },
    {
      title: 'Secure User Authentication',
      description: 'Log in securely with Firebase to access personalized features, ensuring your events and participation are tied to your account.',
      icon: '🔒',
      color: 'bg-purple-100',
      buttonText: 'Sign In',
      buttonPath: '/login',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Discover the Power of TreePlant
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
          Join our community to create, manage, and participate in impactful events that make a difference.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} rounded-lg shadow-lg p-4 sm:p-6 text-center transform transition hover:scale-105 hover:shadow-xl`}
            >
              <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                {feature.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {feature.description}
              </p>
              <button
                onClick={() => navigate(feature.buttonPath)}
                className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm sm:text-base font-medium"
              >
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-600 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-md hover:bg-green-700 transition text-base sm:text-lg font-semibold"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;