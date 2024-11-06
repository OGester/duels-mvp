import { db } from "@/db";

export async function createLeague(data) {
  console.log("[Creating league:]", data);

  return await db.league.create({
    data,
  });
}

export async function updateLeague(data) {
  console.log("data sent to update:", data);
  const { league_id, name, type, isPublic, start_date, end_date, description } =
    data;
  const updatedLeague = await db.league.update({
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
  return updatedLeague;
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
