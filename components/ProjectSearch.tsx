"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-8">
      <label
        htmlFor="project-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search projects
      </label>

      <input
        id="project-search"
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}