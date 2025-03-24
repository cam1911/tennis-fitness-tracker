"use client"; 

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const Drills = () => {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrills = async () => {
      const { data, error } = await supabase.from("DrillLibrary").select("*");

      if (error) {
        console.error("Error fetching drills:", error);
      } else {
        console.log("Fetched drills:", data); // Log fetched drills
        setDrills(data);
      }
      setLoading(false);
    };

    fetchDrills();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading drills...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tennis Drills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.length > 0 ? (
          drills.map((drill) => (
            <Link key={drill.id} href={`/drills/${drill.id}`} className="block">
              <div className="bg-white shadow-md rounded-lg overflow-hidden drill-card transition-transform transform hover:scale-105">
                
                
                {/* Conditional Image Rendering with Placeholder */}
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

                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {drill.title || <span className="bg-gray-300 rounded-md px-4 py-2 animate-pulse inline-block w-2/3"></span>}
                  </h2>
                  <p className="text-gray-600">
                    {drill.category || <span className="bg-gray-200 rounded-md px-2 py-1 animate-pulse inline-block w-1/3"></span>}
                  </p>
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
