import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navLinks = [
    { path: '/', label: 'Home', ariaLabel: 'Go to homepage' },
    { path: '/upcoming-event', label: 'Upcoming Events', ariaLabel: 'View upcoming events' },
    { path: '/about', label: 'About Us', ariaLabel: 'Learn more about TreePlant' },
    { path: '/login', label: 'Login', ariaLabel: 'Log in to your account' },
    { path: '/register', label: 'Register', ariaLabel: 'Create a new account' },
    { path: '/dashboard/create-event', label: 'Create Event', ariaLabel: 'Create a new event' },
    { path: '/dashboard/join-event', label: 'Joined Events', ariaLabel: 'View your joined events' },
    { path: '/dashboard/manage-event', label: 'Manage Events', ariaLabel: 'Manage your events' },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      svgPath: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
      ariaLabel: 'Follow us on Twitter',
    },
    {
      name: 'YouTube',
      svgPath: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z',
      ariaLabel: 'Subscribe to our YouTube channel',
    },
    {
      name: 'Facebook',
      svgPath: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
      ariaLabel: 'Like us on Facebook',
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Explore</h3>
            <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-300 hover:text-green-500 transition text-sm sm:text-base"
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Connect With Us</h3>
            <nav className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="transform transition hover:scale-110"
                  aria-label={social.ariaLabel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-gray-300 hover:text-green-500"
                  >
                    <path d={social.svgPath} />
                  </svg>
                </a>
              ))}
            </nav>
          </div>

          {/* About TreePlant */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">About TreePlant</h3>
            <p className="text-sm sm:text-base text-gray-400">
              TreePlant is dedicated to fostering community-driven environmental initiatives through events like tree planting, cleanups, and donations.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} - All rights reserved by TreePlant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;