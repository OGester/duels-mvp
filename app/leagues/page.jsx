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
    //skips items to start at the correct page and shows as many as set PAGE_SIZE
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  //getting the total count of leagues in DB that match the search
  const totalLeagues = await db.league.count({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
  });

  //the number of leagues shown so far
  const leaguesShown = (pagenum + 1) * PAGE_SIZE;
  //calculating how many leagues there is left in totalLeagues
  const leaguesLeft = totalLeagues - leaguesShown;
  //if leagues left is larger than 0 its set to true and More button is needed
  const showMore = leaguesLeft > 0;
  //if the page number is larger than 0 (first page) the Back button is needed
  const goBack = pagenum > 0;

  //rendering the array of leagues fetched from the database
  //if leaguesis empty it will show no leagues where found.
  const renderedLeagues =
    leagues.length === 0 ? (
      <p className="mt-4 text-lg text-orange-600">No leagues where found</p>
    ) : (
      leagues.map((league) => {
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
      })
    );
  //if no leagues are found render tis message

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
            More
          </Link>
        )}
      </div>
    </main>
  );
}
