//import { Button } from "@/components/ui/button";
import "./globals.css";
import { getUserFromSession } from "@/lib/auth";
import "@/styles/navbar.css";
import "@/styles/home.css";

import Link from "next/link";

export default async function Home() {
  const user = await getUserFromSession();
  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">Leagues R Us</h2>
      </div>
      <div className="landing-page">
        <div className="info-card">
          <h2 className="info-title">What is Leagues r Us?</h2>
          <div className="info-text-wrapper">
            <p className="info-text">
              Leagues R Us wants to encourage interaction and playfulness
              between players in a new way. Challenge friends, family, your
              local club nemesis, or random people all over the globe.
            </p>
          </div>
          <div className="cta-section">
            <button className="letsplay-button">
              <Link href={user ? "/profile-page" : "/sign-in"}>
                Let’s Play!
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
