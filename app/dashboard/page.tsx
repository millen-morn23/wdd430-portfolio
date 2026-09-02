import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome to your portfolio dashboard.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Account</h2>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Name:</strong>{" "}
            {session?.user?.name ?? "Not available"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {session?.user?.email ?? "Not available"}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard/projects"
            className="inline-block rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Manage Projects
          </Link>
        </div>

        <form
          className="mt-4"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
