"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { createLeagueAction } from "@/app/leagues/new/actions";
import { useFormState } from "../lib/hooks";

export default function CreateLeagueForm() {
  const [state, handleSubmit] = useFormState(createLeagueAction);
  //the options for leagueType existing in the prismaSchema
  //if a ENUM is changed in the database it only needs to be modified in this
  //array not for every option
  const leagueType = ["GLOBAL", "LOCAL"];
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="flex flex-col justify-center w-full p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Tjing Duels
      </h2>
      <p className="flex justify-center mb-4">Create new League</p>
      <div className="flex justify-center w-full p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300 w-1/2">
          <CardContent>
            <form onSubmit={handleSubmit} className="">
              <div className="grid w-full items-center gap-4 mt-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nameField">League name</Label>
                  <Input
                    id="nameField"
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="typeField">League Type</Label>
                  <select
                    id="typeField"
                    name="type"
                    className="border rounded px-2 py-1"
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
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="endDate">End date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="descriptionField">Description</Label>
                  <Textarea
                    id="descriptionField"
                    name="description"
                    type="text"
                    placeholder="Profile description"
                  />
                </div>
                {Boolean(state.error) && (
                  <p className="text-red-700">{state.error.message}</p>
                )}
                <div className="flex justify-center py-2 text-xs">
                  <Button className="bg-orange-300 text-black" type="submit">
                    Create
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
