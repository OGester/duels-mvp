"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { setLeagueAdminAction } from "@/app/leagues/[id]/leagueAdmin/action";
import { useFormState } from "../lib/hooks";
//import { League } from "@prisma/client";

export default function SetLeagueAdminForm({ league }) {
  const [state, handleSubmit] = useFormState(setLeagueAdminAction);

  return (
    <div className="flex flex-col justify-center w-full p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Add league admin
      </h2>
      <p className="flex justify-center mb-4">{league.name}</p>
      <div className="flex justify-center w-full p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300 w-1/2">
          <CardContent>
            <form onSubmit={handleSubmit} className="">
              <div className="grid w-full items-center gap-4 mt-6">
                <input
                  type="hidden"
                  name="league_id"
                  value={league.league_id}
                />
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="userEmailField">User Email</Label>
                  <Input
                    id="userEmailField"
                    name="userEmail"
                    type="email"
                    placeholder="User Email"
                  />
                </div>

                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="leagueIdField">league Id</Label>
                  <Input
                    id="leagueIdField"
                    name="league_id"
                    type="text"
                    placeholder="League id"
                  />
                </div> */}
                {Boolean(state.error) && (
                  <p className="text-red-700">{state.error.message}</p>
                )}
                <div className="flex justify-center py-2 text-xs">
                  <Button className="bg-orange-300 text-black" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* need to create a query that gets user_id based on the user email
That adds the user in the league_user_role table as ADMIN.
then add a button on the league page that redirects to set admin page in the leagues [id]
routeModule. as a new page */
