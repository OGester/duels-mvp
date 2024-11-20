//import joinLeague function here
import { redirect } from "next/navigation";
import { joinLeague } from "@/lib/league";
//import { joinLeagueTest } from "@/lib/league";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";

export default function JoinLeagueButton({ league }) {
  async function action() {
    "use server";
    //gets the logged in users user_id
    const user = await getUserFromSession();
    const user_id = user.user_id;

    //gets league id from the leaguePage props
    const league_id = league.league_id;

    //gets the joining users league_user_role
    const leagueRole = await getLeagueRole(user_id, league_id);

    joinLeague(user_id, league_id, leagueRole);
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
