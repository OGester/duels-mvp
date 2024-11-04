"use client";
import { useFormState } from "@/lib/hooks";
import { createLeagueAction } from "./actions";
import { Button } from "@/components/ui/button";

/* export const metadata = {
  title: "Create League",
}; */

export default function CreateLeaguePage() {
  const [state, handleSubmit] = useFormState(createLeagueAction);
  return (
    <>
      <main className="flex flex-col w-full">
        <div className="flex-auto justify-center m-2">
          <h2 className="text-center">Create League</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center py-2 text-xs">
            {Boolean(state.error) && (
              <p className="text-red-700">{state.error.message}</p>
            )}
            <Button className="bg-orange-300 text-black" type="submit">
              Create
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
