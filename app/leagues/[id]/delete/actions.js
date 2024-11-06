"use server";
import { redirect } from "next/navigation";
import { deleteLeague } from "@/lib/league";

export async function deleteLeagueAction(formData) {
  const league_id = formData.get("league_id");

  await deleteLeague(league_id);

  redirect("/leagues");
}
