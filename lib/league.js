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
  });

  return isMember || null;
}

/* const isPublic = formData.get("isPublic") === "on";
const start_date = formData.get("startDate");
const end_date = formData.get("endDate");

console.log("end_date:", end_date);

const data = {
  created_by: user.user_id,
  name: formData.get("name"),
  type: formData.get("type"),
  isPublic,
  start_date: start_date ? new Date(start_date).toISOString() : null,
  end_date: end_date ? new Date(end_date).toISOString() : null,
  description: formData.get("description"),
};
{
  created_by,
  name,
  type,
  isPublic,
  start_date,
  end_date,
  description
}
 */
