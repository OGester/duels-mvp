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
  // Fetch leagues where the user has a role
  const leaguesWithRole = await db.league_user_role.findMany({
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

  // Map results to a consistent structure
  const leaguesWithRoleMapped = leaguesWithRole.map((entry) => ({
    league_id: entry.league.league_id,
    name: entry.league.name,
    role: entry.role, // Include the role
  }));

  // Fetch leagues where the user is a member
  const leaguesAsMember = await db.league_user.findMany({
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
      role: true, // Role is part of league_user too
    },
  });

  // Map results to a consistent structure
  const leaguesAsMemberMapped = leaguesAsMember.map((entry) => ({
    league_id: entry.league.league_id,
    name: entry.league.name,
    role: entry.role, // This might be null for regular memberships
  }));

  // Combine the results, ensuring no duplicates
  const allLeagues = [...leaguesWithRoleMapped, ...leaguesAsMemberMapped];

  // Deduplicate by league_id, prioritizing entries with a role
  const uniqueLeagues = allLeagues.reduce((acc, current) => {
    const existing = acc.find(
      (league) => league.league_id === current.league_id
    );
    if (!existing) {
      acc.push(current);
    } else if (!existing.role && current.role) {
      // Replace with the entry that has a role
      Object.assign(existing, current);
    }
    return acc;
  }, []);

  return uniqueLeagues;
}

/* export async function getUserLeagues(user_id) {
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
 */
