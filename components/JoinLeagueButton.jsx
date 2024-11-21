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

    redirect(`/leagues/${league.league_id}`);
  }

  return (
    //uses a form even though there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button
        className="text-green-500 p-2 border rounded-lg border-slate-300"
        type="submit"
      >
        Join League
      </button>
    </form>
  );
}
