import { compare, hash } from "bcrypt";
import { db } from "@/db";

export async function authenticateUser(email, password) {
  console.log("authenticate user email:", email);
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (user && (await compare(password, user.passwordHash))) {
    return user;
  }
}

export async function createUser({ username, email, password }) {
  //encrypts the password and dictaters how many rounds of salt to be added
  const passwordHash = await hash(password, 10);
  const user = await db.user.create({
    data: { username, email, passwordHash },
  });

  return user;
}

export async function findUser(email) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (user) {
    console.log("User found:", user);
    return user;
  } else {
    console.log("No user found with this email");
    return null;
  }
}
