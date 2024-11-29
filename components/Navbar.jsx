//create navbar here
import { getUserFromSession } from "@/lib/auth";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";
import "@/styles/root.css";

export default async function NavBar() {
  const user = await getUserFromSession();
  console.log("[NavBar] user:", user);

  return (
    <nav className="navbar">
      <ul className="navbar-container">
        {/* Home Link */}
        <div className="navbar-left">
          <li className="font-light font-orbitron">
            <NavLink href="/">Home</NavLink>
          </li>
        </div>

        {/* Conditional Links */}
        <div className="navbar-right">
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
        </div>
      </ul>
    </nav>
  );
}
