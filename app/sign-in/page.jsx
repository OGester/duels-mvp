import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <h3>Här loggar du in</h3>
      <SignInForm />
    </>
  );
}
