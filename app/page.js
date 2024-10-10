import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div>
        <h2 className="text-red-400">Welcome to Tjing doubles</h2>
        <Link href="/sign-in">SIGN IN -</Link> New user? then{" "}
        <Link href="/register">- SIGN UP</Link>
      </div>
    </>
  );
}
