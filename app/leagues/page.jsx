import "@/styles/leagues.css";
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
  const pagenum = parseInt(searchParams.pagenum ?? "0", 10);

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
  console.log("[TOTAL LEAGUES] :", totalLeagues);

  //the number of leagues shown so far
  const leaguesShown = (pagenum + 1) * PAGE_SIZE;
  console.log("LEAGUES SHOWN:", leaguesShown);
  //calculating how many leagues there is left in totalLeagues
  const leaguesLeft = totalLeagues - leaguesShown;
  //if leagues left is larger than 0 its set to true and More button is needed
  const showMore = leaguesLeft > 0;
  //if the page number is larger than 0 (first page) the Back button is needed
  const goBack = pagenum > 0;
  console.log("LEAGUES LEFT:", leaguesLeft);
  //rendering the array of leagues fetched from the database
  //if leagues is empty it will show no leagues where found.
  const renderedLeagues =
    leagues.length === 0 ? (
      <p className="mt-4 text-lg text-orange-600">No leagues where found</p>
    ) : (
      leagues.map((league) => {
        return (
          <Link
            key={league.league_id}
            href={`/leagues/${league.league_id}`}
            className="league-link"
          >
            <div className="league-name">{league.name}</div>
            <div className="league-view">View</div>
          </Link>
        );
      })
    );
  //if no leagues are found render tis message

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">Leagues</h2>
      </div>
      <div className="landing-page">
        <div className="form-card">
          <div className="form-title-container">
            <button className="new-league-button">
              <Link href="/leagues/new">New League</Link>
            </button>
          </div>
          <div className="form-wrapper">
            <div className="form-box">
              <div className="search-box">
                <SearchLeague />
              </div>
              <div className="leagues-container">{renderedLeagues}</div>
            </div>
          </div>
          <div className="cta-section">
            <div className="button-container">
              {goBack && (
                <Link
                  href={{
                    pathname: "/leagues",
                    query: { query, pagenum: Number(pagenum) - 1 },
                  }}
                  className="pagination"
                >
                  ..Back
                </Link>
              )}
              {showMore && (
                <Link
                  href={{
                    pathname: "/leagues",
                    query: { query, pagenum: Number(pagenum) + 1 },
                  }}
                  className="pagination"
                >
                  More..
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
