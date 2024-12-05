"use client";
import "@/styles/searchBar.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchLeague() {
  const searchParams = useSearchParams();

  const pathName = usePathname();

  const router = useRouter();

  const handleChange = useDebouncedCallback((query) => {
    console.log("Debounced value:", query);
    const params = new URLSearchParams(searchParams);

    /* if (query) params.set("query", query);
    else params.delete("query"); */
    if (query) {
      params.set("query", query);
      /*resets pagination when performing a new search to avoid getting the wrong url*/
      params.delete("pagenum");
    } else {
      params.delete("query");
    }

    console.log("Updated serarchParams:", params.toString);
    console.log("Navigating to URL:", `${pathName}?${params.toString()}`);

    router.replace(`${pathName}?${params.toString()}`);
    //setting the timout to 1s for the debouncecallback
  }, 1000);
  console.log("Current search parameters:", searchParams.toString());
  console.log("Current pathname:", pathName);

  return (
    <div>
      <input
        className="search-input"
        onChange={(e) => {
          console.log("Input value before debounce:", e.target.value);
          handleChange(e.target.value);
        }}
        defaultValue={searchParams.get("query") ?? ""}
        placeholder="Search"
      />
    </div>
  );
}
