import { db } from "@/db";
import { notFound } from "next/navigation";
import SetLeagueAdminForm from "@/components/SetLeagueAdminForm";

export default async function LeagueAdminPage(props) {
  const league_id = props.params.id;
  const league = await db.league.findFirst({
    where: {
      league_id,
    },
  });

  if (!league) {
    return notFound();
  }

  return (
    <main className="flex flex-col w-full">
      <div>
        <SetLeagueAdminForm league={league} />
      </div>
    </main>
  );
}
