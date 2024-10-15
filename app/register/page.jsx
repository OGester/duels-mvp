import RegisterForm from "@/components/RegisterForm";
//import Link from "next/link";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <>
      <main className="flex w-full">
        <div className="flex-auto justify-center m-2">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
