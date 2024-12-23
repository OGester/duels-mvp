import { db } from "@/db";

export async function createLeague(data) {
  console.log("[Creating league:]", data);

  return await db.league.create({
    data: {
      ...data,
      league_user_role: {
        create: [
          {
            user_id: data.created_by,
            role: "OWNER",
            created_at: new Date(),
          },
        ],
      },
    },
  });
}

export async function updateLeague(data) {
  console.log("data sent to update:", data);

  //deconstructing the data object, instead of creating a const for each and every property in the object

  const { league_id, name, type, isPublic, start_date, end_date, description } =
    data;
  return await db.league.update({
    where: { league_id: league_id },
    data: {
      name,
      type,
      isPublic,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      description,
    },
  });
}

export async function deleteLeague(league_id) {
  console.log("DELETED LEAGUE", league_id);
  return await db.league.delete({
    where: { league_id },
  });
}

//setting user to ADMIN for a league only done by OWNER
export async function setLeagueAdmin(data) {
  console.log("ADMIN set for:", data);
  return await db.league_user_role.create({
    data,
  });
}

//gets the users league role to detirmine if the user is a OWNER
//or ADMIN for the specific league visted
export async function getLeagueRole(user_id, league_id) {
  const userRole = await db.league_user_role.findUnique({
    where: {
      user_id_league_id: {
        user_id: user_id,
        league_id: league_id,
      },
    },
    select: {
      role: true,
    },
  });
  console.log("userRole:", userRole);
  return userRole?.role || null;
}

//checks the users membershipstatus the league, if none returns null
export async function existingMember(user_id, league_id) {
  const isMember = await db.league_user.findUnique({
    where: {
      //check and return membershipstatus!
      user_id_league_id: {
        user_id: user_id,
        league_id: league_id,
      },
    },
    select: {
      status: true,
    },
  });

  return isMember?.status || null;
}

//funtion to join a league
export async function joinLeague(user_id, league_id, leagueRole) {
  const league = await db.league.findUnique({
    where: { league_id },
    select: { isPublic: true },
  });

  const userLeagueRole =
    leagueRole === "OWNER" || leagueRole === "ADMIN" ? leagueRole : "USER";
  //console.log("Found LEAGUE:", league);
  //console.log("USER ID:", user_id);
  //console.log("LEAGUE ID:", league_id);

  const leagueStatus = league.isPublic ? "ACCEPTED" : "PENDING";
  //console.log("STATUS:", leagueStatus);
  try {
    //const testUser = "f3cdc746-e331-40d4-8b17-686302a938fa";
    //const testLeague = "1e55b465-207a-420c-96e4-598a516d33d0";

    const newMember = await db.league_user.create({
      data: {
        user_id,
        league_id,
        status: leagueStatus,
        role: userLeagueRole,
        requested_at: new Date(),
      },
    });

    console.log("newmember:", newMember);
    return newMember;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("You are already a member of this league");
    }
  }
}

//find accepted members in a specific league
export async function getLeagueMembers(league_id) {
  const leagueUsers = await db.user.findMany({
    where: {
      leagues_joined: {
        some: {
          league_id: league_id,
        },
      },
    },
    select: {
      user_id: true,
      username: true,
      leagues_joined: {
        where: { league_id: league_id },
        select: {
          //gets the membershipStatus from league_user table
          status: true,
        },
      },
    },
  });

  const userObject = leagueUsers.map((user) => ({
    user_id: user.user_id,
    username: user.username,
    status: user.leagues_joined[0]?.status || null,
  }));

  return userObject;
}

export async function acceptLeagueMember(user_id, league_id) {
  /*const existingLeagueUser = await db.league_user.findUnique({
  where: {
    user_id_league_id: {

    }
  }
}) */

  const updateLeagueUserStatus = await db.league_user.update({
    where: {
      user_id_league_id: {
        user_id,
        league_id,
      },
    },
    data: {
      status: "ACCEPTED",
      updated_at: new Date(),
    },
  });

  return updateLeagueUserStatus;
}

export async function removeLeagueMember(user_id, league_id) {
  const deleteLeagueUser = await db.league_user.delete({
    where: {
      user_id_league_id: {
        user_id,
        league_id,
      },
    },
  });
  return deleteLeagueUser;
}
