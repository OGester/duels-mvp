import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="basis-2/4 border-orange-400 border-4 rounded-xl p-8">
        <h2 className="flex justify-center text-black font-bold">
          - Welcome to Tjing doubles -
        </h2>
        {/* <Link className="flex justify-center " href="/profile-page">
          Profile
        </Link> */}
      </main>
    </>
  );
}
