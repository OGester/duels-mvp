"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col justify-center w-auto p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Profile settings
      </h2>
      <p className="flex justify-center mb-4">
        Update your profile information
      </p>
      <div className="flex justify-center p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 mt-6">
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="profileImageUrlField">Image Url</Label>
                  <Input
                    id="profileImageUrlField"
                    name="profileImageUrl"
                    type="text"
                    placeholder="Enter a image url"
                  />
                </div>
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="descriptionField">Description</Label>
                  <Input
                    id="descriptionField"
                    name="description"
                    type="text"
                    placeholder="Your profile description"
                  />
                </div>
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="scoreField">Score</Label>
                  <Input
                    id="scoreField"
                    name="score"
                    type="int"
                    placeholder="Enter score"
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
