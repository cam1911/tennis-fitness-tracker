import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StatsPage() {
  //const session = await getSession();
  //if (!session) redirect("/");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Stats</h1>
      <ul className="bg-white p-4 shadow rounded-lg">
        <li className="text-lg">Drills Completed: 15</li>
        <li className="text-lg">Days Played: 10</li>
        <li className="text-lg">Total Hours Trained: 8</li>
      </ul>
    </main>
  );
}
