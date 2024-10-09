import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_COOKIE = "sessionToken";
const JWT_DURATION = 24 * 60 * 60 * 1000; // 1 day
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export function deleteSessionCookie() {
  cookies().delete(JWT_COOKIE);
}

export async function getUserFromSession() {
  //cookie might not excist
  const sessionToken = cookies().get(JWT_COOKIE)?.value;
  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn("invalid JWT", error);
    }
  }
}

export async function setSessionCookie(id, username, email) {
  const expirationTime = new Date(Date.now() + JWT_DURATION);
  const sessionToken = await new SignJWT(id, username, email)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);
  cookies().set(JWT_COOKIE, sessionToken, {
    expires: expirationTime,
    httpOnly: true,
    sameSite: "lax",
  });
}
