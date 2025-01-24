//import { Button } from "@/components/ui/button";
//import "./globals.css";
import { getUserFromSession } from "@/lib/auth";
import "@/styles/navbar.css";
import "@/styles/home.css";

import Link from "next/link";

export default async function Home() {
  const user = await getUserFromSession();
  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="title">LEAGUE WORLD</h2>
      </div>
      <div className="landing-page">
        <div className="info-card">
          <div className="info-title-container">
            <h2 className="info-title">Who are we?</h2>
          </div>
          <div className="info-text-wrapper">
            <p className="info-text">
              League World wants to encourage interaction and playfulness
              between players in a new way. Challenge friends, family, your
              local club nemesis, or random people all over the globe.
            </p>
          </div>
          <div className="cta-section">
            <button className="letsplay-button">
              <Link href={user ? "/profile-page" : "/sign-in"}>
                Enter our world!
              </Link>
            </button>
            {!user && (
              <button className="register-button">
                <Link href="/register">Not Registered?</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
