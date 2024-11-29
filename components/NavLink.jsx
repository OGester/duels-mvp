"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//investigate what the prefetch is!
export default function NavLink({ children, href, prefetch }) {
  const pathname = usePathname();

  if (href === pathname) {
    return (
      <span
        className="bg-light-gray text-dark-text text-sm font-semibold py-1 px-1 rounded-lg shadow-md border-2 border-custom-purple inline-flex items-center justify-center"
        style={{ textShadow: "0px 1px 2px #787878" }}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="bg-medium-gray text-dark-text text-sm font-semibold py-1 px-1 rounded-lg shadow-md border-2 border-dark-teal hover:bg-dark-teal transition-all duration-200 inline-flex items-center justify-center sm:py-2 sm:px-4 sm:border-4 sm:rounded-full"
      style={{ textShadow: "0px 1px 2px #787878" }}
    >
      {children}
    </Link>
  );
}
