///import { SignJWT, jwtVerify } from "jose";
//import { NextRequest, NextResponse } from "next/server";
//import { cookies } from "next/headers";
//import { getUserFromSession } from "./lib/auth";

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware");

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: "/profile-page", "/admin"
};

/* const protectedRoutes = ["/profile-page"];

export default function middleware(req) {
  const session = getUserFromSession();

  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URLSearchParams("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
} */

/* import { NextResponse } from "next/server";
import { getUserFromSession } from "./lib/auth";

export default async function middleware(req){

  const user = await getUserFromSession();
} */
