"use client";

import './globals.css'
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-950 dark:text-white">
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
