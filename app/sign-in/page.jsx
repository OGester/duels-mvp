import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <title>Tjing Duels</title>

      <h3 className="text-purple-500">Här loggar du in</h3>

      <div className="">
        <SignInForm />
      </div>
    </>
  );
}
