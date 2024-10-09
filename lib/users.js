import { compare, hash } from "bcrypt";
import { db } from "@/db";

export async function authenticateUser(email, password) {
  const user = await db.user.findUnique({
    //kolla upp hur detta skall se ut!
    where: { email },
  });
  if (user && (await compare(password, user.passwordHash))) {
    return user;
  }
}

export async function createUser({ username, email, password }) {
  //encrypts the password and dictaters how many rounds of salt to be added
  const passwordHash = await hash(password, 10);
  return await db.user.create({
    data: { username, email, passwordHash },
  });
}
