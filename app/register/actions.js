"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { createUser } from "@/lib/users";

//change to registerAction
export async function signUpAction(formData) {
  console.log("[signUpAction] formData:", formData);
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //TODO validate data / handle duplicate email error
  const user = await createUser(data);
  console.log("[signUpAction] user:", user);
  await setSessionCookie(user);
  redirect("/profile-page");
}
