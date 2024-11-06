"use client";
import { deleteLeagueAction } from "@/app/leagues/[id]/delete/actions";

import { Button } from "@/components/ui/button";
import { useFormState } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function DeleteLeagueForm({ league }) {
  const router = useRouter();
  const [state, handleSubmit] = useFormState(deleteLeagueAction);

  //redirects to the league page without triggering the deleteLeague action
  const handleClick = () => {
    router.push(`/leagues/${league.league_id}`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center w-full p-6">
        <h2 className="flex justify-center text-black font-bold mb-2.5">
          Delete league
        </h2>
        <div className="flex flex-col justify center">
          <h3 className="flex justify-center mb-4">
            Are you sure you want to delete this league?
          </h3>
          <h3 className="flex justify-center text-xl mb-4">{league.name}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="league_id" value={league.league_id} />
          <div className="flex justify-center gap-4">
            <Button className="bg-green-200 text-black" type="submit">
              Yes
            </Button>
            <Button
              type="button"
              className="bg-red-400 text-black"
              onClick={handleClick}
            >
              NO!
            </Button>
          </div>
          {Boolean(state.error) && (
            <p className="text-red-700">{state.error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
