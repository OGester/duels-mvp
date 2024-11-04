"use server";
import { createLeague } from "@/lib/league";
import { getUserFromSession } from "@/lib/auth";

export async function createLeagueAction() {
  const user = await getUserFromSession();
  console.log("[createLeagueAction] formData:");

  const data = {
    created_by: user.user_id,
    name: "Tore Invitational",
    type: "GLOBAL",
    isPublic: true,
    start_date: new Date(),
    end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: "Tores första league",
  };
  await createLeague(data);
}
