import { deleteSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  async function action() {
    "use server";
    deleteSessionCookie();
    redirect("/");
  }

  return (
    //lägg till css på knapp
    //uses a form even thoug there is no input to be able
    //to invoke a server action
    <form action={action}>
      <button type="submit">Logga ut!</button>
    </form>
  );
}
