import { removeLeagueMember } from "@/lib/league";
import { redirect } from "next/navigation";

export default function RemoveMemberButton({ user_id, league_id }) {
  async function action() {
    "use server";
    //console.log("USER ID PROPS--", user_id);
    //console.log("LEAGUE ID PROPS--", league_id);
    //triggering the acceptLeagueMember function passing the props sent from leagues-Page
    removeLeagueMember(user_id, league_id);

    redirect(`/leagues/${league_id}`);
  }

  return (
    //uses a form even though there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button className="text-orange-500 font-thin" type="submit">
        Decline
      </button>
    </form>
  );
}
