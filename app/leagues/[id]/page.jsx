import "@/styles/specificLeague.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { getUserFromSession } from "@/lib/auth";
import { getLeagueRole, existingMember, getLeagueMembers } from "@/lib/league";

import JoinLeagueButton from "@/components/JoinLeagueButton";
import AcceptMemberButton from "@/components/AcceptMemberButton";
import RemoveMemberButton from "@/components/RemoveMemberButton";
import DeleteLeagueModal from "@/components/DeleteLeagueModal";
import LeaveLeagueModal from "@/components/LeaveLeagueModal";

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

  //gets existing members of this league both accepted and pending
  const listMembers = await getLeagueMembers(league_id);

  //if the leagueRole of user is admin or owner both accepted and pending members will render,
  //otherwise it will just render accepted members of the league
  const verifiedMembers =
    leagueRole === "ADMIN" || leagueRole === "OWNER"
      ? //admin will see all members
        listMembers
      : listMembers.filter((user) => user.status === "ACCEPTED");
  //delete user from league_user table

  const renderedMembers = await verifiedMembers.map((user) => {
    return (
      <div
        key={user.user_id}
        className="flex justify-between items-center p-1.5 px-6 border border-orange-200 rounded"
      >
        <div className="font-medium">{user.username}</div>
        {/* show two buttons if usermembership is pending, accept and delete, pass both user_id and league as props */}
        {user.status === "PENDING" && (
          <div className="flex items-center gap-1.5">
            <AcceptMemberButton
              user_id={user.user_id}
              league_id={league.league_id}
            />

            <RemoveMemberButton
              user_id={user.user_id}
              league_id={league.league_id}
            />
          </div>
        )}
        {user.status === "ACCEPTED" && (
          <div className="flex items-center gap-1.5">
            <Link
              className="text-orange-300"
              key={user.user_id}
              href={`/player-page/${user.user_id}?league_id=${league.league_id}`}
            >
              Visit
            </Link>

            {["ADMIN", "OWNER"].includes(leagueRole) && (
              <RemoveMemberButton
                user_id={user.user_id}
                league_id={league.league_id}
              />
            )}
          </div>
        )}
      </div>
    );
  });

  console.log("MEMBERS:", listMembers);
  //console.log("RENDERED USERS:", renderedMembers);

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="league-title">{league.name}</h2>
      </div>
      <div className="landing-page">
        <div className="background-card">
          <div className="join-league-container">
            {leagueRole === "ADMIN" && (
              <span>You are Admin for this legague</span>
            )}
            {userStatus === "ACCEPTED" && leagueRole !== "ADMIN" && (
              <span>Member</span>
            )}
            {userStatus === "PENDING" && <span>Awaiting Verification</span>}
            <div className="">
              {(!userStatus ||
                (userStatus !== "ACCEPTED" && userStatus !== "PENDING")) && (
                <JoinLeagueButton league={league} />
              )}
            </div>
          </div>
          <div className="form-wrapper">
            <div className="button-box">
              {/*If the logged in user created the league, show these buttons, if
              the user is Admin show ONLY edit otherwise hide them ADD JOIN
              BUTTON IF leagueRole IS NULL!*/}
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
              {leagueRole === "OWNER" && <DeleteLeagueModal league={league} />}
            </div>
            <div className="description-box">
              <h3 className="flex justify-center mb-1 font-bold">
                Description
              </h3>
              <p className="flex justify-center">{league.description}</p>
            </div>
            <div className="members-box">
              {/* showing the accepted members in the league */}
              <h3 className="flex justify-center mb-1 font-bold">
                League Members
              </h3>
              {listMembers.length > 0 ? (
                <div className="flex flex-col gap-2">{renderedMembers}</div>
              ) : (
                <div className="flex justify-center font-medium">
                  {" "}
                  No players in this league yet!{" "}
                </div>
              )}
            </div>
          </div>
          <div className="cta-section">
            {/*If user is ACCEPTED show leave league modal */}
            {userStatus === "ACCEPTED" && (
              <LeaveLeagueModal user_id={user_id} league={league} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
