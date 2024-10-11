import Link from "next/link";
import Head from "next/head";

export default async function Home() {
  return (
    <>
      <Head>
        <title>Tjing Duels</title>
      </Head>
      <main>
        <h2 className="text-pink-700">Welcome to Tjing doubles</h2>
        <Link href="/profile-page">- Profile</Link>
      </main>
    </>
  );
}
