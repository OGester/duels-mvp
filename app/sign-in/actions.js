"use server";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { authenticateUser } from "@/lib/users";

export async function signInAction(formData) {
  //console.log("[signInAction]", formData);
  //converts input to lowercase as saved in database, eliminating case sensitive sign in
  const email = formData.get("email").toLowerCase();
  const password = formData.get("password");
  const user = await authenticateUser(email, password);

  if (!user) {
    return { isError: true, message: "invalid credentials" };
  }

  await setSessionCookie(user);
  redirect(`/profile-page`);
}
