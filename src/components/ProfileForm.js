"use client";

import { useState } from "react";

export default function ProfileForm({ user }) {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    ntrp: "",
    playstyle: "",
  });

  return (
  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-8 rounded-lg shadow-xl max-w-md mx-auto mt-8">
  <h2 className="text-3xl font-extrabold text-white text-center mb-6">Profile</h2>

  <form className="space-y-6">
    {/* Name Field */}
    <div>
      <label className="text-white font-medium mb-2 block">Name:</label>
      <input
        type="text"
        value={profile.name}
        disabled
        className="bg-gray-200 text-gray-800 border border-gray-300 rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
      />
    </div>

    {/* Email Field */}
    <div>
      <label className="text-white font-medium mb-2 block">Email:</label>
      <input
        type="text"
        value={profile.email}
        disabled
        className="bg-gray-200 text-gray-800 border border-gray-300 rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
      />
    </div>

    {/* NTRP Rank Field */}
    <div>
      <label className="text-white font-medium mb-2 block">NTRP Rank:</label>
      <input
        type="text"
        value={profile.ntrp}
        onChange={(e) => setProfile({ ...profile, ntrp: e.target.value })}
        className="bg-white text-gray-800 border border-gray-300 rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
      />
    </div>

    {/* Playstyle Field */}
    <div>
      <label className="text-white font-medium mb-2 block">Playstyle:</label>
      <input
        type="text"
        value={profile.playstyle}
        onChange={(e) => setProfile({ ...profile, playstyle: e.target.value })}
        className="bg-white text-gray-800 border border-gray-300 rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
      />
    </div>

    {/* Save Button */}
    <div className="flex justify-center">
      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-gradient-to-l transition-colors duration-300">
        Save Profile
      </button>
    </div>
  </form>
</div>

  );
}
