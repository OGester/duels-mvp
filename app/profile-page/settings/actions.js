"use server";
import { redirect } from "next/navigation";
import { updateProfile } from "@/lib/profile";
import { getUserFromSession } from "@/lib/auth";

export async function updateProfileAction(formData) {
  const user = await getUserFromSession();
  //console.log("[signInAction]", formData);
  //retrieving data from formData
  const profile_image_url = formData.get("profileImageUrl");
  const description = formData.get("description");

  //make sure description is not longer than 500 characters
  if (description && description.length > 500) {
    return {
      isError: true,
      message: "Description is to long!",
    };
  }

  if (profile_image_url) {
    console.log("[updateProfileAction] URL provided:", profile_image_url);
    //remove extra spaces taht might interfere with startsWith check
    //might not be a strong and forever validation but good enough for this MVP
    const trimmedUrl = profile_image_url.trim();
    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      return {
        isError: true,
        message: "Invalid picture URL! please try again",
      };
    }
  }

  const data = {
    user_id: user.user_id,
    profile_image_url: profile_image_url,
    description: description,
  };
  //console.log("Data sent to updateProfile:", data);
  //console.log("the session user is:", user);

  await updateProfile(data);

  redirect(`/profile-page`);
}
