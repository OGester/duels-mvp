"use client";

import { League } from "@prisma/client";

export default function EditLeagueForm({ league }) {
  return <div>Edit league with name {league.name}</div>;
}
