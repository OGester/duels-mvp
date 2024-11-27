"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { createUser } from "@/lib/users";
import { createProfile } from "@/lib/profile";
import { db } from "@/db";

//change to registerAction
export async function signUpAction(formData) {
  console.log("[signUpAction] formData:", formData);
  const data = {
    username: formData.get("username"),
    //saves email as lowercase to prevent duplicate emails with only Capitalized letters
    //as separating them, opens up for case insensitive sign in that is stil unique in database.
    email: formData.get("email").toLowerCase(),
    password: formData.get("password"),
  };

  //TODO validate data / handle duplicate email error
  //checks database if email exists
  const existingEmail = await db.user.findUnique({
    where: { email: data.email },
  });

  //returns a error message in client
  if (existingEmail) {
    return {
      isError: true,
      message: "This email is already used. Please try again!",
    };
  }

  const user = await createUser(data);
  console.log("[signUpAction] user:", user);

  await createProfile(user.user_id);

  await setSessionCookie(user);

  console.log("registered user", user);

  redirect("/profile-page");
}
