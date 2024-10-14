import SignOutButton from "@/components/SignOutButton";
import { getUserFromSession } from "@/lib/auth";

export default async function userPage() {
  //const user = await getUserFromSession();
  //console.log(user);

  return (
    <div>
      <p>Ready for some duels?</p>
    </div>
  );
}
//{user ? <h1>Welcome: {user.username}</h1> : <h2>"User not logged in"</h2>}
