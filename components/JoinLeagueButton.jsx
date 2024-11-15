//import joinLeague function here
import { redirect } from "next/navigation";
import { joinLeague } from "@/lib/league";
//import { joinLeagueTest } from "@/lib/league";
import { getUserFromSession } from "@/lib/auth";

export default function JoinLeagueButton({ league }) {
  async function action() {
    "use server";
    const user = await getUserFromSession();
    const user_id = user.user_id;
    const league_id = league.league_id;

    joinLeague(user_id, league_id);
    //test if the specific league route could be reached from this component
    redirect(`/leagues/${league.league_id}`);
    //redirect(`/leagues`);
  }

  return (
    //uses a form even though there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button className="text-orange-400" type="submit">
        Join
      </button>
    </form>
  );
}

/* async function joinLeague(userId, leagueId) {
  // Check if the user is already in the league
  const existingMembership = await prisma.league_user.findUnique({
    where: {
      user_id_league_id: {
        user_id: userId,
        league_id: leagueId,
      },
    },
  });

  if (existingMembership) {
    // Return if the user is already a member or pending
    return { message: "You have already joined or requested to join this league." };
  }

  // Fetch league information to check if it's public
  const league = await prisma.league.findUnique({
    where: { league_id: leagueId },
    select: { isPublic: true },
  });

  if (!league) {
    return { message: "League not found." };
  }

  // Determine status based on league visibility
  const membershipStatus = league.isPublic ? "ACCEPTED" : "PENDING";

  // Insert a new record into league_user
  const newMembership = await prisma.league_user.create({
    data: {
      user_id: userId,
      league_id: leagueId,
      status: membershipStatus,
    },
  });

  return {
    message: league.isPublic
      ? "You have successfully joined the league!"
      : "Your request to join the league is pending approval.",
    membershipStatus: newMembership.status,
  };
}
 */
