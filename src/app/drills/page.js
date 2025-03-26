"use client"; 

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const Drills = () => {
  const [drills, setDrills] = useState([]);
  const [filteredDrills, setFilteredDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Null = show all drills

  useEffect(() => {
    const fetchDrills = async () => {
      const { data, error } = await supabase.from("DrillLibrary").select("*");

      if (error) {
        console.error("Error fetching drills:", error);
      } else {
        console.log("Fetched drills:", data);
        setDrills(data);
        setFilteredDrills(data); // Show all drills initially

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((drill) => drill.category))];
        setCategories(uniqueCategories);
      }
      setLoading(false);
    };

    fetchDrills();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selection
    setFilteredDrills(category === selectedCategory ? drills : drills.filter((drill) => drill.category === category));
  };

  if (loading) return <p className="text-center text-xl">Loading drills...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tennis Drills</h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-5 py-3 font-semibold rounded-full transition-all
              ${
                selectedCategory === category
                  ? "bg-cyan-500 text-white shadow-xl" // Selected color
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrills.length > 0 ? (
          filteredDrills.map((drill) => (
            <Link key={drill.id} href={`/drills/${drill.id}`} className="block">
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden drill-card transition-transform transform hover:scale-105 w-full h-80 flex flex-col">
                
                {/* Image */}
                {drill.thumbnail_url ? (
                  <Image 
                    src={drill.thumbnail_url} 
                    alt={drill.title || "Drill Image"} 
                    width={300} 
                    height={200} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center animate-pulse">
                    <span className="text-gray-500">Loading Image...</span>
                  </div>
                )}

                {/* Content (Fixed Height) */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="text-gray-900 dark:text-white text-xl font-bold line-clamp-2">{drill.title}</h2>
                </div>

              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No drills available.</p>
        )}
      </div>
    </div>
  );
};

export default Drills;
