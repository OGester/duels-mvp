"use server";
import { updateLeague } from "@/lib/league";
import { redirect } from "next/navigation";

export async function editLeagueAction(formData) {
  console.log("formData includes:", formData);

  const league_id = formData.get("league_id");
  const name = formData.get("name");
  const type = formData.get("type");
  const isPublic = formData.get("isPublic") === "on"; // Convert checkbox to boolean
  const start_date = formData.get("startDate");
  const end_date = formData.get("endDate");
  const description = formData.get("description");

  const data = {
    league_id, // assuming updateLeague expects league_id as part of the object
    name,
    type,
    isPublic,
    start_date,
    end_date,
    description,
  };

  await updateLeague(data);

  redirect("/leagues");
}
