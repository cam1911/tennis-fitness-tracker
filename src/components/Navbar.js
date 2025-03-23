'use client'; // This ensures it runs as a client-side component

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();

  // Extract user initials or show ??
  const userInitials = session?.user?.name
    ? session.user.name.split(' ').map(name => name[0]).join('').toUpperCase()
    : null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/">Tennis Tracker</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {['Profile', 'Drills', 'Stats'].map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase()}`}
              className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-purple-500 hover:text-white"
            >
              {page}
            </Link>
          ))}
        </div>

        {/* Profile Icon */}
        <div className="flex items-center space-x-3">
          {session ? (
            <div className="relative">
              {/* Blue ring with initials when signed in */}
              <div className="w-12 h-12 flex items-center justify-center border-2 border-blue-400 text-blue-400 rounded-full font-bold text-lg">
                {userInitials}
              </div>

            </div>
          ) : (
            // Generic user icon when NOT signed in
            <Image
              src="https://prod-cdn-static.utrsports.net/webapp/3.6.01-110131/img/v2/icons/icon-profile.svg"
              alt="Profile Icon"
              width={40}
              height={40}
              className="opacity-75 hover:opacity-100 transition"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
