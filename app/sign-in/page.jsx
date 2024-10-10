import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <div className="">
        <h3 className="">Här loggar du in</h3>

        <div className="">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
