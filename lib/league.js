import { db } from "@/db";

export async function createLeague(data) {
  console.log("[Creating league:]", data);
  return await db.league.create({
    data,
  });
}
