"use server";
import { updateLeague } from "@/lib/league";
import { redirect } from "next/navigation";

export async function editLeagueAction(formData) {
  console.log("formData includes:", formData);

  const league_id = formData.get("league_id");
  const name = formData.get("name");
  const type = formData.get("type");
  //convert checkbox to boolean
  const isPublic = formData.get("isPublic") === "on";
  const start_date = formData.get("startDate");
  const end_date = formData.get("endDate");
  const description = formData.get("description");

  //validate required fields
  if (!name || !type || !start_date || !end_date) {
    return {
      isError: true,
      message: "All required fields must be entered",
    };
  }

  //make sure description is not longer than 500 characters
  if (description && description.length > 500) {
    return {
      isError: true,
      message: "Description is to long!",
    };
  }
  //check and ensure that end date is after start date
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate >= endDate) {
    return {
      isError: true,
      message: "End date must be after start date!",
    };
  }

  const data = {
    league_id,
    name,
    type,
    isPublic,
    start_date: new Date(start_date).toISOString(),
    end_date: new Date(end_date).toISOString(),
    //this is optional if not provided sets description to empty string
    description: description || "",
  };

  try {
    // Attempt to update the league
    await updateLeague(data);
    //console.log("[editLeagueAction] League updated:", data);
  } catch (error) {
    console.error("[editLeagueAction] Error updating league:", error);
    return {
      isError: true,
      message: "Error occurred updating the league. Please try again later.",
    };
  }

  redirect("/leagues");
}
