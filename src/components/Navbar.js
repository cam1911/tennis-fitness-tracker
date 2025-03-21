'use client'; // This is necessary to ensure it is treated as a client-side component

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  // User's initials if signed in, or a placeholder if not signed in
  const userInitials = session ? session.user.name.split(' ').map(name => name[0]).join('') : '??';

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/">Tennis Tracker</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            href="/profile"
            className="hover:bg-purple-500 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
          >
            Profile
          </Link>
          <Link
            href="/drills"
            className="hover:bg-purple-500 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
          >
            Drills
          </Link>
          <Link
            href="/stats"
            className="hover:bg-purple-500 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
          >
            Stats
          </Link>
        </div>

        {/* Profile Icon */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
              {userInitials}
            </div>
            {/* Optional: Show a sign-out button */}
            {session && (
              <button
                onClick={() => signOut()}
                className="absolute top-0 right-0 bg-red-500 rounded-full text-xs p-1"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
