"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//investigate what the prefetch is!
export default function NavLink({ children, href, prefetch }) {
  const pathname = usePathname();
  if (href === pathname) {
    return <span className="text-orange-300">{children}</span>;
  }
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-orange-300 hover:underline"
    >
      {children}
    </Link>
  );
}
