import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Leagues",
};

export default async function LeaguesPage() {
  return (
    <>
      <main className="flex flex-col w-full">
        <div className="flex-auto justify-center m-2">
          <h2 className="text-center">Leagues</h2>
        </div>
        <div className="flex justify-center m-2">
          <Button asChild className="bg-orange-300 text-black">
            <Link href="/leagues/new">Create new League</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
