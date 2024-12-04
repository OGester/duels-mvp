"use client";
import "@/styles/searchBar.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchLeague() {
  const searchParams = useSearchParams();

  const pathName = usePathname();

  const router = useRouter();

  const handleChange = useDebouncedCallback((query) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);
    else params.delete("query");

    router.replace(`${pathName}?${params.toString()}`);
    //setting the timout to 1s for the debouncecallback
  }, 1000);

  return (
    <div>
      <input
        className="search-input"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get("query") ?? ""}
        placeholder="Search"
      />
    </div>
  );
}
