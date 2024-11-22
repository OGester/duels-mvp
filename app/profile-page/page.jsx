import Link from "next/link";

import { getUserFromSession } from "@/lib/auth";
import { db } from "@/db";
import { getUserLeagues } from "@/lib/profile";

export default async function userPage() {
  const user = await getUserFromSession();
  const user_id = user.user_id;
  const profileBio = await db.profile.findUnique({
    where: {
      user_id: user_id,
    },
  });

  const joinedLeagues = await getUserLeagues(user_id);

  const renderedUserLeagues = joinedLeagues.map((league) => {
    return (
      <Link
        key={league.league_id}
        href={`/leagues/${league.league_id}`}
        className="flex justify-between items-center p-2 hover:text-teal-500 transition-all duration-300"
      >
        <div className="font-medium text-transform: capitalize">
          {league.name}
        </div>
        <div className="text-xs font-extralight text-transform: capitalize">
          {league.role}
        </div>
      </Link>
    );
  });

  return (
    <main className="flex justify-center flex-col w-full">
      {/* <div className="flex flex-col items-center justify-center w-1/2 min-h-full p-6"> */}
      <h2 className="text-center text-black font-bold mb-2.5">
        Your Duels Profile
      </h2>
      <p className="text-center text-lg mb-4">
        Hello:{" "}
        <span className="font-black text-xl tracking-wide text-orange-500 text-transform: capitalize">
          {user.username}
        </span>
      </p>
      <div className="flex flex-col items-center justify-center min-h-1/2 p-2">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border-2 border-orange-300 p-6">
          <div className="flex flex-col items-center">
            <img
              src={profileBio?.profile_image_url}
              alt="ProfileImage"
              className="w-40 h-40 rounded-full border-4 border-orange-300 shadow-lg object-cover mb-4"
            />
            <div className="text-lg font-semibold mt-2 mb-4">Bio:</div>
            <p className="text-center text-gray-700 whitespace-pre-line mb-6">
              {profileBio?.description}
            </p>
            <div className="text-lg font-semibold mt-2 mb-1">Your score:</div>
            <p className="text-2xl font-bold text-gray-800">
              {profileBio?.score}
            </p>
            <div className="text-lg font-semibold mt-4 mb-1">
              Joined Leagues:
            </div>
            <p className="text-gray-800 border rounded-xl w-full p-2 mt-2">
              {renderedUserLeagues}
            </p>
          </div>
          <div className="flex justify-center  mt-6">
            <button className="w-1/2 py-2 px-4 bg-orange-300 text-white font-semibold rounded-lg shadow hover:bg-orange-400 transition">
              <Link href="/leagues">Go to Leagues</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
