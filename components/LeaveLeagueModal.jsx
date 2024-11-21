"use client";
import { useState } from "react";
import { leaveLeagueAction } from "@/app/leagues/[id]/actions";

import Modal from "@/components/Modal";
import { Button } from "./ui/button";
import { useFormState } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function LeaveLeagueModal({ user_id, league }) {
  const router = useRouter();
  const [state, handleSubmit] = useFormState(leaveLeagueAction);
  const [isModalOpen, setModalOpen] = useState(false);

  // Redirects to the league page without triggering the deleteLeague action
  const handleClick = () => {
    setModalOpen(false);
    router.push(`/leagues/${league.league_id}`);
  };

  return (
    <div>
      <button
        className="font-light text-slate-400"
        onClick={() => setModalOpen(true)}
      >
        Leave League
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col justify-center w-full p-6">
          <h2 className="flex justify-center text-black font-bold mb-2.5">
            Leave league?
          </h2>
          <div className="flex flex-col justify-center">
            <h3 className="flex justify-center mb-4">
              Are you sure you want to leave this league?
            </h3>
            <h3 className="flex justify-center text-xl mb-4">{league.name}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="user_id" value={user_id} />
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
      </Modal>
    </div>
  );
}
