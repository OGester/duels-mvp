//"use client";
import CreateLeagueForm from "@/components/CreateLeagueForm";

/* export const metadata = {
  title: "Create League",
}; */

export default function CreateLeaguePage() {
  return (
    <>
      <main className="flex flex-col w-full">
        <CreateLeagueForm />
      </main>
    </>
  );
}
