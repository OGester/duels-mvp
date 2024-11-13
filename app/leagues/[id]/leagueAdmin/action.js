"use server";
import { setLeagueAdmin } from "@/lib/league";
import { redirect } from "next/navigation";
import { findUser } from "@/lib/users";

// i need to know what league_id to add league_user role to
// and what user id based on the given email

export async function setLeagueAdminAction(formData) {
  const email = formData.get("userEmail");
  console.log("User email entered:", email);

  const user = await findUser(email);

  //console.log("User found:", user);

  const user_id = user.user_id;
  const league_id = formData.get("league_id");
  const role = "ADMIN";

  const data = {
    user_id,
    league_id,
    role,
  };

  setLeagueAdmin(data);

  redirect("/leagues");
}
