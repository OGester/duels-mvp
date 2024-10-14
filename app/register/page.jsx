import RegisterForm from "@/components/RegisterForm";
//import Link from "next/link";

export const metadata = {
  title: "Sign Up",
};

export default function RegisterPage() {
  return (
    <>
      <main className="flex w-full">
        <div className="flex-auto justify-center m-2">
          <RegisterForm />
        </div>
        {/*  <div>
        Already registered? <Link href="/sign-in">Sign in</Link> instead
      </div> */}
      </main>
    </>
  );
}
