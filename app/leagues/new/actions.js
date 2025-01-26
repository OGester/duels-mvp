"use server";
import { createLeague } from "@/lib/league";
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createLeagueAction(formData) {
  const user = await getUserFromSession();
  console.log("[createLeagueAction] formData:", formData);

  //retrieving data from formData to verify required fields
  const name = formData.get("name");
  const type = formData.get("type");
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

  //enables to check and ensure that end date is after start date
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate >= endDate) {
    return {
      isError: true,
      message: "End date must be after start date!",
    };
  }

  const data = {
    created_by: user.user_id,
    name,
    type,
    isPublic,
    start_date: new Date(start_date).toISOString(),
    end_date: new Date(end_date).toISOString(),
    //this is optional if not provided sets description to empty string
    description: description || "",
  };

  try {
    await createLeague(data);
    console.log("[createLeagueAction] League created:", data);
  } catch (error) {
    console.error("[createLeagueAction] Error creating league:", error);
    return {
      isError: true,
      message: "Error accured when creating league. Try again later",
    };
  }
  redirect(`/leagues`);
}
