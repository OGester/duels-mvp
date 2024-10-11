import SignInForm from "@/components/SignInForm";
import Head from "next/head";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Tjing Duels</title>
      </Head>
      <h3 className="text-purple-500">Här loggar du in</h3>

      <div className="">
        <SignInForm />
      </div>
    </>
  );
}
