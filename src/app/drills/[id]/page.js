"use client";

import * as React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const DrillDetail = ({ params }) => {
  const { id } = React.use(params); // Get drill ID from URL, use React.use() to unwrap Promise
  const [drill, setDrill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrill = async () => {
      if (!id) return;
      const { data, error } = await supabase.from("DrillLibrary").select("*").eq("id", id).single();
      if (error) console.error("Error fetching drill:", error);
      setDrill(data);
      setLoading(false);
    };

    fetchDrill();
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading drill...</p>;
  if (!drill) return <p className="text-center text-xl">Drill not found</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{drill.title}</h1>

      {/* Video Player */}
      <div className="mb-6">
        {drill.video_url ? (
          <iframe
            width="100%"
            height="400"
            src={drill.video_url.replace("watch?v=", "embed/")} // Convert watch URL to embed URL
            title={drill.title}
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Video Available</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700">{drill.description}</p>
    </div>
  );
};

export default DrillDetail;
