import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getUserFromSession } from "@/lib/auth";
import { db } from "@/db";

export default async function userPage() {
  const user = await getUserFromSession();
  const userId = user.user_id;
  const profileBio = await db.profile.findUnique({
    where: {
      user_id: userId,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-1/2 min-h-full p-6">
      <h2 className="text-center text-black font-bold mb-2.5">
        Your Duels Profile
      </h2>
      <p className="text-center text-lg mb-4">
        Hello: <span className="font-bold text-xl">{user.username}</span>
      </p>

      <div className="flex flex-col items-center min-w-full min-h-full border-4 border-orange-300 rounded-xl /* sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 space-y-4 */">
        <div className="flex justify-center max-w-xs max-h-xs p-3">
          <img
            src={profileBio?.profile_image_url}
            alt="ProfileImage"
            className="w-40 h-40 rounded-xl border-4 shadow-outline border-orange-300 object-fill"
          />
        </div>
        <p className="text-center border-b min-w-full p-2">Bio:</p>
        <div className="flex justify-center w-1/2 p-4 ">
          <p className="text-xl font-semibold text-center p-2">
            {profileBio?.description}
          </p>
        </div>
        <p className="text-center border-b min-w-full p-2">Your score:</p>
        <div className="flex justify-center w-1/2 p-4 ">
          <p className="text-xl font-semibold text-center p-2">
            {profileBio?.score}
          </p>
        </div>
        <span className="flex justify center">
          <Button asChild className="bg-orange-300 text-black">
            <Link href="/leagues">Go to Leagues</Link>
          </Button>
        </span>
      </div>
    </div>
  );
}
