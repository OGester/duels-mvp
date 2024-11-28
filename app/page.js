import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserFromSession } from "@/lib/auth";

import Link from "next/link";

export default async function Home() {
  const user = await getUserFromSession();
  return (
    <>
      <main>
        <h2 className="flex justify-center text-black font-bold">
          - Welcome to My Leagues -
        </h2>
        <div className="flex justify-center p-4">
          <Card className="flex flex-col justify-center border-4 border-orange-300 w-1/2">
            <CardHeader>
              <div>
                <CardTitle className="flex justify-center">
                  Get ready to challange the people around you!
                </CardTitle>
                <CardDescription className="flex ml-6">
                  What is My Leagues?
                </CardDescription>
                <CardContent>
                  <p>
                    My League wants to encourage the interaction and
                    playfullness between players in a new way, challenge
                    friends, family your local club nemesis or just random
                    people all over the globe.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  {!user ? (
                    <Button asChild className="bg-orange-300 text-black">
                      <Link href="/sign-in">Let´s play</Link>
                    </Button>
                  ) : (
                    <Button asChild className="bg-orange-300 text-black">
                      <Link href="/profile-page">Let´s play</Link>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
