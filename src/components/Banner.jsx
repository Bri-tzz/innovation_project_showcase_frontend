import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ title, subtitle, linkText, onClick, backgroundImage }) => {
  return (
    <header
      className='flex flex-col gap-3 justify-evenly items-center w-full'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensures the image covers the entire header
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat',
        height: '70vh', // Sets the height of the header to 70% of the viewport height
      }}
    >
      <h1 className='text-6xl font-bold text-white uppercase'>{title}</h1>
      <p className='text-3xl text-white'>{subtitle}</p>
      <button className='px-6 py-3 text-white bg-red-600 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors' onClick={onClick}>
        {linkText}
      </button>
    </header>
  );
};

export default Banner;
