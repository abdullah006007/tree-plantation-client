import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const impactStats = [
    { label: 'Events Organized', value: '150+', description: 'Community-driven events hosted worldwide.' },
    { label: 'Trees Planted', value: '10,000+', description: 'Contributing to a greener planet.' },
    { label: 'Volunteers Engaged', value: '5,000+', description: 'People making a difference together.' },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            About TreePlant
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            TreePlant is a community-driven platform dedicated to fostering environmental change through events like tree planting, cleanups, and donation drives. Our mission is to empower individuals to create a sustainable future.
          </p>
        </div>

        {/* Image and Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.squarespace-cdn.com/content/v1/55bb7771e4b0315175b13b49/7840447d-361a-4ffe-a6fb-e5b5a6e096be/L%26C_Arlington-3.jpg"
              alt="TreePlant community planting trees"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => (e.target.src = 'https://images.squarespace-cdn.com/content/v1/55bb7771e4b0315175b13b49/7840447d-361a-4ffe-a6fb-e5b5a6e096be/L%26C_Arlington-3.jpg')}
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              At TreePlant, we believe in the power of collective action. Our platform connects passionate individuals to organize and participate in events that promote environmental sustainability. Whether it’s planting trees, cleaning up local areas, or supporting charitable causes, we’re here to make a difference.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition text-base sm:text-lg font-medium"
              aria-label="Sign up to join TreePlant"
            >
              Join Our Community
            </Link>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform transition hover:scale-105"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;