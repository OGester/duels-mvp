import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";

export default async function SpecificLeaguePage(props) {
  //query to find a specific league based on the prop sent in to the function
  //in this case the league_id
  const user = await getUserFromSession();
  const league = await db.league.findFirst({
    where: {
      league_id: props.params.id,
    },
  });

  if (!league) {
    return notFound();
  }

  const user_id = user.user_id;
  const league_id = league.league_id;

  const leagueRole = await getLeagueRole(user_id, league_id);

  return (
    <main className="flex flex-col w-full">
      <div className="flexp-4 max-w-full">
        <div className="flex justify-center min-w-full">
          <h2 className="text-center text-black font-bold mb-2.5 w-full">
            {league.name}
          </h2>
        </div>

        <div className=" flex justify-center min-w-full min-h-full pt-6">
          <div className="flex flex-col justify-center border-4 rounded-xl border-orange-300 w-1/2 h-full py-4 px-4 gap-4">
            <div className="flex justify-end gap-4">
              {/*If the logged in user created the league, show these buttons, if the user is Admin
              show ONLY edit otherwise hide them */}

              <Link
                href={`/leagues/${league.league_id}/leagueAdmin`}
                className="p-2 border rounded border-orange-300"
              >
                New Admin
              </Link>
              <Link
                href={`/leagues/${league.league_id}/edit`}
                className="p-2 border rounded border-orange-300"
              >
                Edit
              </Link>
              <Link
                href={`/leagues/${league.league_id}/delete`}
                className="p-2 border rounded border-orange-300"
              >
                Delete
              </Link>
            </div>

            <div className="flex flex-col justify-center p-4 border rounded border-orange-300">
              <div>
                <h3 className="flex justify-center mb-1 font-bold">
                  Description
                </h3>
              </div>
              <p className="flex justify-center">{league.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
