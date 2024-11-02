import { db } from "@/db";
//import { getUserFromSession } from "./auth";

export async function createProfile(user_id) {
  console.log("Creating profile for userId:", user_id);
  return await db.profile.create({
    data: {
      user_id,
      profile_image_url: null,
      description: null,
      score: 0,
      //user: User,
    },
  });
}

export async function updateProfile({
  user_id,
  profile_image_url,
  description,
}) {
  console.log("update profile bio");
  //const user = getUserFromSession();
  //const userId = user.id;
  const updates = {};
  if (profile_image_url === undefined || profile_image_url === "") {
    updates.profile_image_url = undefined;
  } else {
    updates.profile_image_url = profile_image_url;
  }
  if (description) {
    description.length > 2 ? (updates.description = description) : undefined;
  }

  console.log(updates);
  return await db.profile.update({
    where: { user_id },
    data: updates,
  });
}
