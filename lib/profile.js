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

export async function getProfile(user_id) {
  const profile = await db.user.findUnique({
    where: {
      user_id: user_id,
    },
    select: {
      username: true,
      profile: {
        select: {
          profile_image_url: true,
          description: true,
          score: true,
        },
      },
    },
  });
  return profile;
}

export async function getEmail(user_id) {
  const email = await db.user.findUnique({
    where: {
      user_id: user_id,
    },
    select: {
      email: true,
    },
  });
  return email;
}

export async function getUserLeagues(user_id) {
  const myAcceptedLeagues = await db.league_user_role.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      league: {
        select: {
          league_id: true,
          name: true,
        },
      },
      role: true,
    },
  });

  //mapping results to extract the necessary fields
  const myLeagues = myAcceptedLeagues.map((entry) => ({
    league_id: entry.league.league_id,
    name: entry.league.name,
    role: entry.role,
  }));

  return myLeagues;
}
