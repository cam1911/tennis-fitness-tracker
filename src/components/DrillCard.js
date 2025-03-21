import React from 'react';

const DrillCard = ({ title, description, difficulty }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-purple-500 rounded-full">
        {difficulty}
      </span>
    </div>
  );
};

export default DrillCard;
