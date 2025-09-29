import React from 'react';

const NewsLetter = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Join Our Newsletter
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
          Stay updated with the latest community events, tree planting initiatives, and eco-friendly tips from TreePlant
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-lg mx-auto">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address for newsletter subscription"
              className="flex-1 border border-gray-300 rounded-md p-3 sm:p-4 text-sm sm:text-base text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              type="button"
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition text-sm sm:text-base font-medium"
            >
              Subscribe now
            </button>
          </form>
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;