import { Card, CardContent } from "@/components/ui/card";
//import Link from "next/link";

import { getUserFromSession } from "@/lib/auth";
import { db } from "@/db";

export default async function userPage() {
  const user = await getUserFromSession();
  const userId = user.id;
  const profileBio = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-1/2 min-h-full p-6">
      <h2 className="text-center text-black font-bold mb-2.5">
        Your Duels Profile
      </h2>
      <p className="text-center text-lg mb-4">Welcome: {user.username}</p>

      <div className="flex flex-col items-center min-w-full min-h-full border-4 border-orange-300 rounded-xl /* sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 space-y-4 */">
        <div className="flex justify-center max-w-xs max-h-xs p-3">
          <img
            src={profileBio?.profileImageUrl}
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
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col justify-center">
  <div className="flex justify-center">
    <h2>Welcome</h2>
  </div>
  <h3 className="flex justify-center font-bold ">-- {user.username} --</h3>

  <p>Ready for some duels?</p>
  <div className="flex justify-center">
    <p>{profileBio?.description}</p>
  </div>
</div>; */
}
