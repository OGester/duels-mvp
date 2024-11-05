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
    return <div key={league.league_id}>{league.name}</div>;
  });

  return (
    <>
      <main className="flex flex-col w-full">
        <div className="flex-auto justify-center m-2">
          <h2 className="text-center">Leagues</h2>
        </div>
        <div className="flex flex-col py-2">{renderedLeagues}</div>
        <div className="flex justify-center m-2">
          <Button asChild className="bg-orange-300 text-black">
            <Link href="/leagues/new">Create new League</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
