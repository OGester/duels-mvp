"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//change to register action
import { updateProfileAction } from "@/app/profile-page/settings/actions";
import { useFormState } from "../lib/hooks";
import Link from "next/link";

export default function UpdateProfileForm() {
  const [state, handleSubmit] = useFormState(updateProfileAction);

  return (
    <div className="flex flex-col justify-center w-full p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Tjing Duels
      </h2>
      <p className="flex justify-center mb-4">Update Profile</p>
      <div className="flex justify-center w-full p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300 w-full">
          <CardContent>
            <form onSubmit={handleSubmit} className="">
              <div className="grid w-full items-center gap-4 mt-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="profileImageUrlField">Image Url</Label>
                  <Input
                    id="profileImageUrlField"
                    name="profileImageUrl"
                    type="text"
                    placeholder="Image Url"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="descriptionField">Description</Label>
                  <Input
                    id="descriptionField"
                    name="description"
                    type="text"
                    placeholder="Profile description "
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
