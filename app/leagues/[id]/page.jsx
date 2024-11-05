import { notFound } from "next/navigation";
import { db } from "@/db";

export default async function SpecificLeaguePage(props) {
  //query to find a specific league based on the prop sent in to the function
  //in this case the league_id
  const league = await db.league.findFirst({
    where: {
      league_id: props.params.id,
    },
  });

  if (!league) {
    return notFound();
  }
  console.log(props);

  return <div>{league.name}</div>;
}
