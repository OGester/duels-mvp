import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
      <div>
        Already registered? <Link href="/sign-in">Sign in</Link> instead
      </div>
    </>
  );
}
