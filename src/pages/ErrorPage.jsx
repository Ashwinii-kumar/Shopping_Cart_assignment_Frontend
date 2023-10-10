import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-start text-white mt-24 ">
    <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
    <p className="text-lg mb-4">The page you are looking for does not exist.</p>
    <NavLink to="/" className="text-white hover:underline bg-red-600 py-1 px-2 rounded-lg">
      Go to Home
    </NavLink>
  </div>
  );
};

export default ErrorPage;