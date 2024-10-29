"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { createProfile } from "@/lib/profile";

//gets the information from the updateProfileForm form inputs

export async function updateProfileAction(formData) {
  console.log("[updateProfileAction] formData:", formData);
  const data = {
    profileImageUrl: formData.get("profileImageUrl"),
    description: formData.get("description"),
    score: parseInt(formData.get("score")),
  };

  //TODO validate data / handle duplicate email error
  const profile = await createProfile(data);
  console.log("[updateProfileAction] profile info:", profile);
  //await setSessionCookie(user);
  redirect("/profile-page");
}
