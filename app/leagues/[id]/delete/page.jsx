import { notFound } from "next/navigation";
import { db } from "@/db";
import DeleteLeagueForm from "@/components/DeleteLeagueForm";

export default async function DeleteLeaguePage(props) {
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
        <DeleteLeagueForm league={league} />
      </div>
    </main>
  );

  //async function handleDelete() {
  //await deleteLeague(league.league_id);
}
