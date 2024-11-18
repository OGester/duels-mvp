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

//find users in specific leagues
export async function findLeagueUsers(league_id) {
  const leagueUsers = await db.user.findMany({
    where: {
      leagues_joined: {
        some: {
          league_id: league_id,
        },
      },
    },
    select: {
      user_id: true,
      username: true,
    },
  });
  if (leagueUsers.length === 0) {
    return null;
  }
  return leagueUsers;
}
