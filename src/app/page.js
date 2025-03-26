import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen text-gray-950 dark:text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to Tennis Fitness Tracker</h1>
        <p className="mt-4 text-lg">Track your tennis drills, progress, and stats!</p>
      </div>
    </main>
  );
}
