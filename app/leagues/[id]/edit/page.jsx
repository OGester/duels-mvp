import { notFound } from "next/navigation";
import { db } from "@/db";

export default async function LeagueEditPage(props) {
  const league_id = props.params.id;
  const league = await db.league.findFirst({
    where: {
      league_id,
    },
  });

  if (!league) {
    return notFound();
  }

  return <div>Editing league with id {league_id}</div>;
}
