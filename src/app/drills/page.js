"use client"

import { useState } from "react";

const drillCategories = [
  "Forehand",
  "Backhand",
  "Serve",
  "Volley",
  "Approach Shot",
  "Lobs and Overheads",
  "Passing Shot",
  "Drop Shot",
  "Mental Game",
  "Fitness",
  "Return",
  "Doubles",
  "Slice",
  "Topspin",
];

const DrillsPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎾 Tennis Drill Library</h2>
      <div className="flex flex-wrap gap-4">
        {drillCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 text-white rounded-full font-semibold transition-all
              ${activeCategory === category ? "bg-purple-700 shadow-lg" : "bg-blue-500 hover:bg-purple-600"}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display drills for selected category */}
      {activeCategory && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-800">{activeCategory} Drills</h3>
          <p className="text-gray-600">Here are the drills related to {activeCategory}.</p>
        </div>
      )}
    </div>
  );
};

export default DrillsPage;
