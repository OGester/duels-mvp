import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <main className="flex w-full">
        <div className="flex-auto justify-center m-2">
          <SignInForm />
        </div>
      </main>
    </>
  );
}
