import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ users: [], leagues: [] });
  }

  try {
    const users = await db.user.findMany({
      //if more parameters should be searched in user table implement the
      // OR: after where as an array of search parameters
      where: {
        username: { startsWith: query, mode: "insensitive" },
      },
    });

    const leagues = await db.league.findMany({
      where: {
        name: { startsWith: query, mode: "insensitive" },
      },
    });

    return NextResponse.json({ users, leagues });
  } catch (error) {
    console.error("Error during search:", error);
    return NextResponse.json(
      { error: "An error occurred during the search" },
      { status: 500 }
    );
  }
}
