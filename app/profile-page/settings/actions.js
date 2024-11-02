"use server";
import { redirect } from "next/navigation";
import { updateProfile } from "@/lib/profile";
import { getUserFromSession } from "@/lib/auth";

export async function updateProfileAction(formData) {
  const user = await getUserFromSession();
  //console.log("[signInAction]", formData);
  const data = {
    user_id: user.user_id,
    profile_image_url: formData.get("profileImageUrl"),
    description: formData.get("description"),
  };
  //console.log("Data sent to updateProfile:", data);
  //console.log("the session user is:", user);

  await updateProfile(data);

  redirect(`/profile-page`);
}
