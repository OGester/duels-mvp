"use server";
import { createLeague } from "@/lib/league";
import { getUserFromSession } from "@/lib/auth";

export async function createLeagueAction(formData) {
  const user = await getUserFromSession();
  console.log("[createLeagueAction] formData:", formData);

  const isPublic = formData.get("isPublic") === "on";
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

  await createLeague(data);

  redirect(`/leagues`);
}

/* const data = {
    created_by: user.user_id,
    name: formData.get("name"),
    type: formData.get("type"),
    isPublic: (isPublic = formData.get("isPublic") === "on"),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    description: formData.get("description"),
  }; */
