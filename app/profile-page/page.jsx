import Link from "next/link";
import "@/styles/profile.css";
import { getUserFromSession } from "@/lib/auth";
import { db } from "@/db";
import { getUserLeagues } from "@/lib/profile";

export default async function userPage() {
  const user = await getUserFromSession();
  const user_id = user.user_id;
  const profileBio = await db.profile.findUnique({
    where: {
      user_id: user_id,
    },
  });

  const joinedLeagues = await getUserLeagues(user_id);

  const renderedUserLeagues = joinedLeagues.map((league) => {
    return (
      <Link
        key={league.league_id}
        href={`/leagues/${league.league_id}`}
        className="league-link"
      >
        <div className="league-name">{league.name}</div>
        {league.role && <div className="league-role">{league.role}</div>}
      </Link>
    );
  });

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">Welcome</h2>
        <span className="username">{user.username}</span>
      </div>

      <div className="landing-page">
        <div className="profile-card">
          <div className="page-title-container">
            <h2 className="page-title">Your Profile</h2>
          </div>
          <div className="profile-wrapper">
            <div className="profile-box">
              <div className="profile-header">
                <img
                  src={profileBio?.profile_image_url}
                  alt="ProfileImage"
                  className="profile-image"
                />
                <div className="score-container">
                  <div className="score-label">Your Score:</div>
                  <p className="score">{profileBio?.score}</p>
                </div>
              </div>
              <div className="separator"></div>
              <div className="bio-section">
                <div className="bio-label">Bio:</div>
                <p className="bio-description">{profileBio?.description}</p>
              </div>
            </div>
            <div className="joined-leagues-container">
              <div className="joined-leagues-title">Joined Leagues:</div>
              <div className="leagues-container">{renderedUserLeagues}</div>
            </div>
          </div>
          <div className="cta-section">
            <button className="leagues-button">
              <Link href="/leagues">Go to Leagues</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
