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
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchDrills = async () => {
      setLoading(true);

      // ✅ Fetch Supabase Drills
      const { data: supabaseDrills, error } = await supabase.from("DrillLibrary").select("*");
      if (error) {
        console.error("Error fetching Supabase drills:", error);
      }

      // ✅ Fetch YouTube Drills
      const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // 🔥 Use NEXT_PUBLIC_
      const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=tennis+drills&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`;

      let youtubeDrills = [];
      try {
        const response = await fetch(YOUTUBE_SEARCH_URL);
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }
        const youtubeData = await response.json();
        
        if (youtubeData?.items) {
          youtubeDrills = youtubeData.items.map((video) => ({
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnail_url: video.snippet.thumbnails.medium.url,
            video_url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            category: "YouTube",
            source: "youtube",
          }));
        } else {
          console.warn("YouTube API returned no items:", youtubeData);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube drills:", error);
      }

      // ✅ Merge and Set Drills
      const mergedDrills = [...(supabaseDrills || []), ...youtubeDrills];
      setDrills(mergedDrills);
      setFilteredDrills(mergedDrills);

      // ✅ Extract Categories
      const uniqueCategories = [...new Set(mergedDrills.map((drill) => drill.category))];
      setCategories(uniqueCategories);

      setLoading(false);
    };

    fetchDrills();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
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
              ${selectedCategory === category ? "bg-cyan-500 text-white shadow-xl" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
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

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="text-gray-900 dark:text-white text-xl font-bold line-clamp-2">{drill.title}</h2>
                  {drill.source === "youtube" && (
                    <span className="text-sm text-blue-500">YouTube Drill</span>
                  )}
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
