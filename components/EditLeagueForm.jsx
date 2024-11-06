"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { editLeagueAction } from "@/app/leagues/[id]/edit/actions";
import { useFormState } from "../lib/hooks";
//import { League } from "@prisma/client";

export default function EditLeagueForm({ league }) {
  const [state, handleSubmit] = useFormState(editLeagueAction);
  //the options for leagueType existing in the prismaSchema
  //if a ENUM is changed in the database it only needs to be modified in this
  //array not for every option
  const leagueType = ["GLOBAL", "LOCAL"];

  //Sets isPublic state based on the league.isPublic value from the league props when component mounts
  const [isPublic, setIsPublic] = useState(false);

  //useEffect to set initial value of isPublic based on yhe props
  useEffect(() => {
    setIsPublic(!!league.isPublic);
  }, [league.isPublic]);

  return (
    <div className="flex flex-col justify-center w-full p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Update League
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
                  <Label htmlFor="nameField">League name</Label>
                  <Input
                    id="nameField"
                    name="name"
                    type="text"
                    placeholder="name"
                    defaultValue={league.name || ""}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="typeField">League Type</Label>
                  <select
                    id="typeField"
                    name="type"
                    className="border rounded px-2 py-1"
                    defaultValue={league.type || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      Select league type
                    </option>
                    {leagueType.map((type) => (
                      <option key={type} value={type}>
                        {/*converts "GLOBAL" to "Global by making all characters after the first to lowercase*/}
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="isPublic">Public League</Label>
                  <Input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="startDate">Start date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    //converts the Date object to a ISOString and slice only extracts the first 10 characters leaving YYYY-MM-DD
                    defaultValue={
                      league.start_date
                        ? new Date(league.start_date).toISOString().slice(0, 10)
                        : ""
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="endDate">End date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    //converts the Date object to a ISOString and slice only extracts the first 10 characters leaving YYYY-MM-DD
                    defaultValue={
                      league.end_date
                        ? new Date(league.end_date).toISOString().slice(0, 10)
                        : ""
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="descriptionField">Description</Label>
                  <Textarea
                    id="descriptionField"
                    name="description"
                    type="text"
                    placeholder="Profile description"
                    defaultValue={league.description || ""}
                  />
                </div>
                {Boolean(state.error) && (
                  <p className="text-red-700">{state.error.message}</p>
                )}
                <div className="flex justify-center py-2 text-xs">
                  <Button className="bg-orange-300 text-black" type="submit">
                    Update
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
