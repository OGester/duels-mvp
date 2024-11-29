//create navbar here
import { getUserFromSession } from "@/lib/auth";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

export default async function NavBar() {
  const user = await getUserFromSession();
  console.log("[NavBar] user:", user);

  return (
    <nav className="w-full bg-dark-gray py-4 px-2 sm:px-6">
      <ul className="flex flex-wrap gap-4 items-center justify-start sm:justify-between mx-auto max-w-full">
        {/* Home Link */}
        <li className="font-light font-orbitron">
          <NavLink href="/">Home</NavLink>
        </li>

        {/* Conditional Links */}
        {user ? (
          <li>
            <NavLink href="/profile-page">Profile</NavLink>
          </li>
        ) : (
          <li>
            <NavLink href="/register">Register</NavLink>
          </li>
        )}

        {user && (
          <li>
            <NavLink href="/leagues">Leagues</NavLink>
          </li>
        )}

        {/* Admin */}
        <li>
          <NavLink href="/admin" prefetch={false}>
            Admin
          </NavLink>
        </li>

        {/* Settings */}
        {user && (
          <li>
            <NavLink href="/profile-page/settings">Settings</NavLink>
          </li>
        )}

        {/* Sign In/Sign Out */}
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
