import React from 'react';

const Card = ({ image, title, description, link }) => {
  return (
    <div className="lg:w-60 w-[2000px] bg-white shadow-md rounded-lg overflow-hidden ">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <a href={link} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white text-center rounded">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Card;
