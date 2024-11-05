"use client";

import { League } from "@prisma/client";

export default function EditLeagueForm({ league }) {
  return <div>Client component has league with title {league.name}</div>;
}
