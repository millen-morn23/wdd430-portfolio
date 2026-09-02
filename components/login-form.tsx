"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <button
        aria-disabled={isPending}
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {errorMessage && (
        <p role="alert" className="text-red-600">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
