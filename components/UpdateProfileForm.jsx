"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

//change to register action
import { updateProfileAction } from "@/app/profile-page/settings/actions";
import { useFormState } from "../lib/hooks";

export default function UpdateProfileForm() {
  const [state, handleSubmit] = useFormState(updateProfileAction);

  return (
    <main className="flex justify-center flex-col w-full">
      <h2 className="text-center text-black font-bold mb-2.5">Tjing Duels</h2>
      <p className="text-center mb-4">Update your Profile</p>
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full max-w-md rounded-lg shadow-lg border-2 border-orange-300 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="profileImageUrlField">Image Url</Label>
              <Input
                id="profileImageUrlField"
                name="profileImageUrl"
                type="text"
                placeholder="Image Url"
                className="w-full p-2 border rounded-lg border-gray-300 focus:ring-orange-300 focus:border-orange-300"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descriptionField">Description</Label>
              {/* change input to textarea!! */}
              <Textarea
                id="descriptionField"
                name="description"
                type="text"
                placeholder="Profile description "
                className="w-full p-2 border rounded-lg border-gray-300 focus:ring-orange-300 focus:border-orange-300"
              />
            </div>
            {Boolean(state.error) && (
              <p className="text-red-700">{state.error.message}</p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-300 text-white font-semibold rounded-lg shadow hover:bg-orange-400 transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
