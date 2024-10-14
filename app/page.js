import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main>
        <h2 className="flex justify-center text-black font-bold">
          - Welcome to Tjing doubles -
        </h2>
        <div className="flex justify-center p-4">
          <Card className="flex flex-col justify-center border-4 border-orange-300">
            <CardHeader>
              <div>
                <CardTitle className="flex justify-center">
                  Get ready to challange the players around you!
                </CardTitle>
                <CardDescription className="flex ml-6">
                  What is duels?
                </CardDescription>
                <CardContent>
                  <p>
                    Tjing wants to encourage the interaction and playfullness
                    between players in a new way, challenge friends, family your
                    local club nemesis or just random people you meet on the
                    course. in different one on one duels.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <button>Let´s Play!</button>
                </CardFooter>
              </div>
            </CardHeader>
          </Card>
        </div>
        <Link className="flex justify-center " href="/profile-page">
          Profile
        </Link>
      </main>
    </>
  );
}
