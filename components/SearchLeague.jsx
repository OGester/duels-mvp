"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchLeague() {
  const searchParams = useSearchParams();

  const pathName = usePathname();

  const router = useRouter();

  const handleChange = (query) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);
    else params.delete("query");

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
