//create navbar here
import { getUserFromSession } from "@/lib/auth";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

export default async function NavBar() {
  const user = await getUserFromSession();
  console.log("[NavBar] user:", user);
  return (
    <nav>
      <ul className="flex gap-2">
        <li className="font-bold font-orbitron">
          <NavLink href="/">Home</NavLink>
        </li>
        {user ? (
          <li className="ml-auto">
            <NavLink href="/profile-page">Profile</NavLink>
          </li>
        ) : (
          <li className="ml-auto">
            <NavLink href="/register">Register</NavLink>
          </li>
        )}
        <li>
          <NavLink href="/admin" prefetch={false}>
            Admin
          </NavLink>
        </li>
        {user ? (
          <li>
            <SignOutButton />
          </li>
        ) : (
          <li>
            <NavLink href="/sign-in">Sign-in</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
