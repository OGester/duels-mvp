"use server";
import { setLeagueAdmin } from "@/lib/league";
import { redirect } from "next/navigation";
import { findUser } from "@/lib/users";

// i need to know what league_id to add league_user role to
// and what user id based on the given email

export async function setLeagueAdminAction(formData) {
  const email = formData.get("userEmail");
  console.log("User email entered:", email);

  //error handled in findUser function
  const user = await findUser(email);

  //console.log("User found:", user);

  const user_id = user.user_id;
  const league_id = formData.get("league_id");
  //make sure there is a league_id provided
  if (!league_id) {
    console.error("league id is missing");
    return { error: "League Id is required" };
  }
  const role = "ADMIN";

  const data = {
    user_id,
    league_id,
    role,
  };

  try {
    await setLeagueAdmin(data);
  } catch (error) {
    //handle errors from setting the league admin
    console.error("Error setting league admin:", error);
    return { error: "Failed to assign admin role" };
  }
  //setLeagueAdmin(data);

  //redirects if successfull

  redirect("/leagues");
}
