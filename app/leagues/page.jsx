import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";
import SearchLeague from "@/components/SearchLeague";
import { skip } from "@prisma/client/runtime/library";

export const metadata = {
  title: "Leagues",
};

export default async function LeaguesPage({ searchParams }) {
  //if the pagenum is undefined its set to 0
  const pagenum = searchParams.pagenum ?? 0;

  //if the query is undefined its set to en empty string
  const query = searchParams.query ?? "";

  const PAGE_SIZE = 5;

  const leagues = await db.league.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    skip: +pagenum * PAGE_SIZE,
    //fetch one extra item to know if there is more
    take: PAGE_SIZE + 1,
  });

  //getting the total count of leagues in DB that match the search
  const totalLeagues = await db.league.count({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
  });

  //determine if there is an extra league, and in that case an extra page
  const showMore = leagues.length > PAGE_SIZE;
  //if the page number is larger than 0 (first page)
  const goBack = pagenum > 0;

  //rendering the array of leagues fetched from the database
  //slice will only show the first PAGE_SIZE leagues but still
  //allow to know if there is more to show
  const renderedLeagues = leagues.slice(0, PAGE_SIZE).map((league) => {
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
    <main className="flex justify-center flex-col w-full">
      <div className="flex-auto justify-center m-2">
        <h2 className="text-center">Leagues</h2>
      </div>
      <div className="flex justify-center m-2">
        <div className="flex w-1/2 justify-between">
          <SearchLeague className="" />
          <Button asChild className="bg-orange-300 text-black">
            <Link href="/leagues/new">New League</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center m-2">
        <div className="flex flex-col w-1/2 py-2 gap-2">{renderedLeagues}</div>
      </div>
      <div className="flex justify-center gap-4 m-4">
        {goBack && (
          <Link
            href={{
              pathname: "/leagues",
              query: { query, pagenum: Number(pagenum) - 1 },
            }}
            className="font-semibold text-orange-300"
          >
            Back
          </Link>
        )}
        {showMore && (
          <Link
            href={{
              pathname: "/leagues",
              query: { query, pagenum: Number(pagenum) + 1 },
            }}
            className="font-semibold text-orange-300"
          >
            Show more
          </Link>
        )}
      </div>
    </main>
  );
}
