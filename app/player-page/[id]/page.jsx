import { getProfile } from "@/lib/profile";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";
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
  );
}
