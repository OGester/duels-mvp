import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="text-5xl">Welcome to Tjing doubles</div>
      <Link href="/sign-in">SIGN IN -</Link> New user? then{" "}
      <Link href="/register">- SIGN UP</Link>
    </>
  );
}
