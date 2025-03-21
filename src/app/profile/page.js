"use client";

import { useSession, signIn } from "next-auth/react";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Sign Up or Log In</h1>
        <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <ProfileForm user={session.user} />
    </main>
  );
}
