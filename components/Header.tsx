import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Millen&apos;s Portfolio
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}