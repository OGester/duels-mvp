//import { Button } from "@/components/ui/button";
import { getUserFromSession } from "@/lib/auth";
import "@/styles/buttons-links.css";
import "@/styles/home.css";

import Link from "next/link";

export default async function Home() {
  const user = await getUserFromSession();
  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">MY LEAGUES</h2>
      </div>
      <div className="landing-page">
        <div className="info-card">
          <h3 className="info-title">What is My Leagues?</h3>
          <div className="info-text-wrapper">
            <p className="info-text">
              My League wants to encourage interaction and playfulness between
              players in a new way. Challenge friends, family, your local club
              nemesis, or random people all over the globe.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <button className="rounded-button">
            <Link href={user ? "/profile-page" : "/sign-in"}>Let’s Play!</Link>
          </button>
          {!user && (
            <button className="secondary-button">
              <Link href="/register">Not Registered?</Link>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
