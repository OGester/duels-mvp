"use server";
import { redirect } from "next/navigation";
import { deleteLeague } from "@/lib/league";

export async function deleteLeagueAction(formData) {
  const league_id = formData.get("league_id");

  await deleteLeague(league_id);

  redirect("/leagues");
}

export async function leaveLeagueAction(formData) {
  const user_id = formData.get("user_id");
  const league_id = formData.get("league_id");

  await removeLeagueMember(user_id, league_id);
  redirect("/leagues");
}
