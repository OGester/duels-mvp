import "@/styles/profile.css";
import { getProfile } from "@/lib/profile";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";
import Link from "next/link";
import { getEmail } from "@/lib/profile";

export default async function ShowUserProfile(props) {
  console.log("PROPS:", props);
  const visitingUser = await getUserFromSession();
  const user_id = props.params.id;
  const league_id = props.searchParams.league_id;

  const userRole = await getLeagueRole(visitingUser.user_id, league_id);
  const profile = await getProfile(user_id);
  console.log("PROFILE:", profile);

  //if the userRole of visiting user is OWNER it gets the email for the player profile
  // and renders it on the page otherwise its value is null and nothing is displayed.
  const email =
    userRole === "OWNER" ? (await getEmail(user_id))?.email || null : null;

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">Player Profile</h2>
      </div>

      <div className="landing-page">
        <div className="profile-card">
          <div className="page-title-container">
            <h2 className="page-title"> {profile.username}</h2>

            {email && <p className="p-2">{email}</p>}
          </div>
          <div className="profile-wrapper">
            <div className="info-box">
              <div className="profile-header">
                <img
                  src={profile?.profile?.profile_image_url}
                  alt="ProfileImage"
                  className="profile-image"
                />
                <div className="score-container">
                  <div className="score-label">Your Score:</div>
                  <p className="score">{profile?.profile?.score}</p>
                </div>
              </div>
              <div className="separator"></div>
              <div className="bio-section">
                <div className="bio-label">Bio:</div>
                <p className="bio-description">
                  {profile?.profile?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="cta-section">
            <button className="leagues-button">
              <Link href="/leagues">Go to Leagues</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <main className="flex justify-center flex-col w-full">
      <h2 className="text-center text-black font-bold mb-2.5">
        Player Profile
      </h2>
      <div className="flex flex-col items-center justify-center min-h-1/2 p-2">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-orange-500 text-transform: capitalize mb-2">
            {profile.username}
          </h1>
          {email && <p className="p-2">{email}</p>}
        </div>
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
 */
}
