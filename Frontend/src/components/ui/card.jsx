import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />}
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;