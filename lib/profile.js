import { db } from "@/db";

export async function createProfile({ profileImageUrl, description, score }) {
  return await db.profile.create({
    data: { profileImageUrl, description, score },
  });
}
