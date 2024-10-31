import { db } from "@/db";
//import { getUserFromSession } from "./auth";

export async function createProfile(userId) {
  console.log("Creating profile for userId:", userId);
  return await db.profile.create({
    data: {
      userId,
      profileImageUrl: null,
      description: null,
      score: 0,
      //user: User,
    },
  });
}

export async function updateProfile({ userId, profileImageUrl, description }) {
  console.log("update profile bio");
  //const user = getUserFromSession();
  //const userId = user.id;
  return await db.profile.update({
    where: { userId },
    data: {
      profileImageUrl,
      description,
    },
  });
}
