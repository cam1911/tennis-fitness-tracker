"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Correct way to get params in App Router
import { supabase } from "@/lib/supabase";

const DrillDetail = () => {
  const params = useParams(); // ✅ Get params dynamically
  const [drill, setDrill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrill = async () => {
      if (!params?.id) return; // ✅ Ensure params exist

      const id = params.id; // ✅ Extract `id` safely
      console.log("Fetching drill with ID:", id);

      // ✅ Try fetching from Supabase first
      const { data, error } = await supabase.from("DrillLibrary").select("*").eq("id", id).single();

      if (error || !data) {
        console.warn("Drill not found in Supabase, checking YouTube API...");

        // ✅ Fetch from YouTube API if not in Supabase
        const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const YOUTUBE_VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${YOUTUBE_API_KEY}`;

        try {
          const response = await fetch(YOUTUBE_VIDEO_URL);
          if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
          }
          const youtubeData = await response.json();

          if (youtubeData.items.length > 0) {
            const video = youtubeData.items[0];
            setDrill({
              id: video.id,
              title: video.snippet.title,
              description: video.snippet.description,
              video_url: `https://www.youtube.com/embed/${video.id}`,
              source: "youtube",
            });
          } else {
            console.warn("YouTube API returned no results.");
          }
        } catch (err) {
          console.error("Error fetching YouTube drill:", err);
        }
      } else {
        // ✅ If found in Supabase, use it
        setDrill(data);
      }

      setLoading(false);
    };

    fetchDrill();
  }, [params]); // ✅ Watch for `params` changes

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
            src={drill.video_url}
            title={drill.title}
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        ) : (
          <div className="w-full h-64 font-medium text-gray-950 dark:text-white flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Video Available</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-950 dark:text-white">{drill.description}</p>
    </div>
  );
};

export default DrillDetail;
