'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const Profile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    ntrp: '',
    playstyle: '',
  });

  // If user is NOT signed in, show a login button
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign in to access your profile</h2>
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center border border-gray-300 rounded-full px-5 py-2 shadow-sm text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Continue with Google
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Profile</h2>

      <label className="block text-gray-600 font-medium mb-1">Name:</label>
      <input
        type="text"
        value={profile.name}
        disabled
        className="border p-2 rounded w-full mb-3 bg-gray-100 text-gray-700 cursor-not-allowed"
      />

      <label className="block text-gray-600 font-medium mb-1">Email:</label>
      <input
        type="text"
        value={profile.email}
        disabled
        className="border p-2 rounded w-full mb-3 bg-gray-100 text-gray-700 cursor-not-allowed"
      />

      <label className="block text-gray-600 font-medium mb-1">NTRP Rank:</label>
      <input
        type="text"
        value={profile.ntrp}
        onChange={(e) => setProfile({ ...profile, ntrp: e.target.value })}
        className="border p-2 rounded w-full mb-3"
      />

      <label className="block text-gray-600 font-medium mb-1">Playstyle:</label>
      <input
        type="text"
        value={profile.playstyle}
        onChange={(e) => setProfile({ ...profile, playstyle: e.target.value })}
        className="border p-2 rounded w-full mb-3"
      />

      <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition">
        Save Profile
      </button>

      {/* Sign Out Button */}
      <button
        onClick={() => signOut()}
        className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
