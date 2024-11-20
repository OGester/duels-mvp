"use client";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  return (
    <div>
      <h1>test</h1>
      <button onClick={router.back}>ok</button>
    </div>
  );
}

/* 
import Link from "next/link";

export default function Modal(league) {
  return (
    <div>
      <h1>test</h1>
      <Link href="/leagues/"> ok </Link>
    </div>
  );
} */
