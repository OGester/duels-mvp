import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";

export const metadata = {
  title: "Leagues",
};

export default async function LeaguesPage() {
  const leagues = await db.league.findMany();

  //rendering the array of leagues fetched from the database
  const renderedLeagues = leagues.map((league) => {
    return (
      <Link
        key={league.league_id}
        href={`/leagues/${league.league_id}`}
        className="flex justify-between items-center p-2 border border-orange-300 rounded"
      >
        <div>{league.name}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <>
      <main className="flex justify-center flex-col w-full">
        <div className="flex-auto justify-center m-2">
          <h2 className="text-center">Leagues</h2>
        </div>
        <div className="flex justify-center m-2">
          <div className="flex flex-col w-1/2 py-2 gap-2">
            {renderedLeagues}
          </div>
        </div>
        <div className="flex justify-center m-2">
          <Button asChild className="bg-orange-300 text-black">
            <Link href="/leagues/new">Create new League</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
