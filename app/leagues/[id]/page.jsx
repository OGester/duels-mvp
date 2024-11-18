import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole } from "@/lib/league";
import { existingMember } from "@/lib/league";
import { findLeagueUsers } from "@/lib/users";
import JoinLeagueButton from "@/components/JoinLeagueButton";
import { ListBulletIcon } from "@radix-ui/react-icons";

export default async function SpecificLeaguePage(props) {
  //query to find a specific league based on the prop sent in to the function
  //in this case the league_id
  const loggedInUser = await getUserFromSession();
  const league = await db.league.findFirst({
    where: {
      league_id: props.params.id,
    },
  });

  if (!league) {
    return notFound();
  }

  const user_id = loggedInUser.user_id;
  const league_id = league.league_id;
  //checks if the user is admin or owner on this league
  const leagueRole = await getLeagueRole(user_id, league_id);
  //checks user status on the league
  const userStatus = await existingMember(user_id, league_id);
  console.log(userStatus);

  //checks for existing members of this league
  const listUsers = await findLeagueUsers(league_id);

  if (listUsers) {
    const renderedUsers = await listUsers.map((user) => {
      return (
        <div
          key={user.user_id}
          className=" flex justify-between items-center p-2 border border-orange-200 rounded"
        >
          <div>{user.username}</div>
          <Link key={user.user_id} href={`/player-page/${user.user_id}`}>
            Visit
          </Link>
        </div>
      );
    });
  }
  console.log("MEMBERS:", listUsers);
  //console.log("RENDERED USERS:", renderedUsers);

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
              show ONLY edit otherwise hide them 
              ADD JOIN BUTTON IF leagueRole IS NULL!*/}

              {leagueRole === "OWNER" && (
                <Link
                  href={`/leagues/${league.league_id}/leagueAdmin`}
                  className="p-2 border rounded border-orange-300"
                >
                  New Admin
                </Link>
              )}
              {(leagueRole === "OWNER" || leagueRole === "ADMIN") && (
                <Link
                  href={`/leagues/${league.league_id}/edit`}
                  className="p-2 border rounded border-orange-300"
                >
                  Edit
                </Link>
              )}
              {leagueRole === "OWNER" && (
                <Link
                  href={`/leagues/${league.league_id}/delete`}
                  className="p-2 border rounded border-orange-300"
                >
                  Delete
                </Link>
              )}
            </div>

            <div className="flex flex-col justify-center p-4 border rounded border-orange-300">
              <div>
                <h3 className="flex justify-center mb-1 font-bold">
                  Description
                </h3>
              </div>
              <p className="flex justify-center">{league.description}</p>
            </div>
            {/* showing the accepted members in the league */}
            <div className="flex flex-col justify-center p-4 border rounded border-orange-300">
              <div>
                <h3 className="flex justify-center mb-1 font-bold">
                  League Members
                </h3>
              </div>
              {listUsers ? (
                <div className="flex flex-col gap-2">{renderedUsers}</div>
              ) : (
                <div className="flex justify-center font-medium">
                  {" "}
                  No players in this league yet!{" "}
                </div>
              )}
            </div>

            {/* show memberStatus depending on the logged in users league_user status */}
            <div className="flex justify-center mb-1">
              {userStatus === "ACCEPTED" && <span>Member</span>}
              {userStatus === "PENDING" && <span>Awaiting Verification</span>}
              {(!userStatus ||
                (userStatus !== "ACCEPTED" && userStatus !== "PENDING")) && (
                <JoinLeagueButton league={league} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
