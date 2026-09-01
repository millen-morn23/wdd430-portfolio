"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      <Link
        href={createPageURL(previousPage)}
        aria-disabled={currentPage === 1}
        className={`rounded-lg border px-4 py-2 text-sm font-medium ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Previous
      </Link>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={createPageURL(nextPage)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-lg border px-4 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}