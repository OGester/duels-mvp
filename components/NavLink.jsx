"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/navbar.css";
//investigate what the prefetch is!
export default function NavLink({ children, href, prefetch }) {
  const pathname = usePathname();

  if (href === pathname) {
    return <span className="navlink navlink-active">{children}</span>;
  }

  return (
    <Link href={href} prefetch={prefetch} className="navlink navlink-default">
      {children}
    </Link>
  );
}
