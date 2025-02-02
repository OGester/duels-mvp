//imports getuserfromsession funtion so we can check if a user is logged in
import { getUserFromSession } from "./lib/auth";
import { NextResponse } from "next/server";

import { SIGNIN, ERROR, ROOT, PROFILE } from "./lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;

  const session = await getUserFromSession();
  //console.log(session);
  console.log("middleware");

  //
  const isAuthenticated = !!session?.username;
  // states wich routes that should be restricted if logged in as user
  const adminRoutes = ["/admin"];

  //if youre not logged in /profile and /admin urls are restricted
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(SIGNIN, nextUrl));
  }
  if (
    isAuthenticated &&
    //checks if the logged in user has access to adminroutes
    session.role === "USER" &&
    adminRoutes.includes(nextUrl.pathname)
  ) {
    console.log("admin status required! access denied");
    return NextResponse.redirect(new URL(ERROR, nextUrl));
  }
}

export const config = {
  matcher: [
    "/profile-page/:path*",
    "/admin",
    "/error",
    "/leagues/:path*",
    "/player-page/:path*",
  ],
};

/* if (loggedInAs === "admin" && adminRoutes.includes(nextUrl.pathname)) {
    console.log("admin access");
    //return NextResponse.redirect(new URL(ADMIN, nextUrl));
  } */

// '/((?!api|_next/static|_next/image|favicon.ico).*)'
// "/profile-page/:path*", "/admin"

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

//Using routes from routes.js to manage what routes are public or not
//might use this later
/*  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  console.log(isPublicRoute); */

//&& !isPublicRoute (should be inserted after !isAuthenticated in the if statement)

//redirects to the page deired when trying to access restricted directorys
//return NextResponse.redirect(new URL("/sign-in", request.url));
