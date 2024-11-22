import { getProfile } from "@/lib/profile";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";
import Link from "next/link";
//import { getEmail } from "@/lib/profile";

export default async function ShowUserProfile(props) {
  console.log("PROPS:", props);
  const visitingUser = await getUserFromSession();
  const user_id = props.params.id;
  const league_id = props.searchParams.league_id;

  const userRole = await getLeagueRole(visitingUser.user_id, league_id);
  const profile = await getProfile(user_id);
  console.log("PROFILE:", profile);

  if (userRole === "OWNER") {
    const showEmail = await getEmail(user_id);
  }
  //console.log("Owner userProfile:", fullUserProfile);

  return (
    <main className="flex justify-center flex-col w-full">
      {/* <div className="flex flex-col items-center justify-center w-1/2 min-h-full p-6"> */}
      <h2 className="text-center text-black font-bold mb-2.5">
        Your Duels Profile
      </h2>
      <div className="flex flex-col items-center justify-center min-h-1/2 p-2">
        <h1 className="text-2xl font-semibold mb-4">
          <span className="text-orange-500 text-transform: capitalize">
            {profile.username}
          </span>
        </h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border-2 border-orange-300 p-6">
          <div className="flex flex-col items-center">
            <img
              src={profile?.profile?.profile_image_url}
              alt="ProfileImage"
              className="w-40 h-40 rounded-full border-4 border-orange-300 shadow-lg object-cover mb-4"
            />
            <div className="text-lg font-semibold mt-2 mb-4">Bio:</div>
            <p className="text-center text-gray-700 whitespace-pre-line mb-6">
              {profile?.profile?.description}
            </p>
            <div className="text-lg font-semibold">Your score:</div>
            <p className="text-2xl font-bold text-gray-800">
              {profile?.profile?.score}
            </p>
          </div>
          <div className="mt-6">
            <button className="w-full py-2 px-4 bg-orange-300 text-white font-semibold rounded-lg shadow hover:bg-orange-400 transition">
              <Link href="/leagues">Go to Leagues</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* return (
  <div>
    <div>
      Show profile for <span>{profile.username}</span>
      <img
        src={profile?.profile?.profile_image_url}
        alt="ProfileImage"
        className="w-40 h-40 rounded-xl border-4 shadow-outline border-orange-300 object-fill"
      />
      <div>{profile?.profile?.description}</div>
      <div>{profile?.profile?.score}</div>
    </div>
  </div>
); */
