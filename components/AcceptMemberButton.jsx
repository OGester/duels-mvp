import { acceptLeagueMember } from "@/lib/league";
import { redirect } from "next/navigation";

export default function AcceptMemberButton({ user_id, league_id }) {
  async function action() {
    "use server";

    acceptLeagueMember(user_id, league_id);

    redirect(`/leagues/${league_id}`);
  }

  return (
    //uses a form even though there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button className="text-orange-500 font-thin" type="submit">
        Accept
      </button>
    </form>
  );
}
