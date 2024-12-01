//import { Button } from "@/components/ui/button";
import { getUserFromSession } from "@/lib/auth";
import "@/styles/buttons-links.css";

import Link from "next/link";

export default async function Home() {
  const user = await getUserFromSession();
  return (
    <>
      <main>
        <h2 className="flex justify-center text-black font-bold">
          - My Leagues -
        </h2>
        <div className="flex justify-center p-4">
          <div className="flex flex-col justify-center border-4 border-orange-300 w-1/2">
            <div>
              <div>
                <div className="flex ml-6">What is My Leagues?</div>
                <div>
                  <p>
                    My League wants to encourage the interaction and
                    playfullness between players in a new way, challenge
                    friends, family your local club nemesis or just random
                    people all over the globe.
                  </p>
                </div>
                <div className="flex justify-center">
                  {!user ? (
                    <button className="rounded-button">
                      <Link href="/sign-in">Let´s play</Link>
                    </button>
                  ) : (
                    <button className="rounded-button">
                      <Link href="/profile-page">Let´s play</Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
