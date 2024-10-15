import { deleteSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  async function action() {
    "use server";
    deleteSessionCookie();
    redirect("/");
  }

  return (
    //uses a form even thoug there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button className="text-orange-400" type="submit">
        Log-out
      </button>
    </form>
  );
}
