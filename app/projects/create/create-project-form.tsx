"use client";

import { useActionState } from "react";
import { createProject, type State } from "@/app/lib/actions";

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Project title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          aria-describedby="title-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        />

        <div
          id="title-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.title?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          required
          minLength={20}
          rows={5}
          aria-describedby="description-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        />

        <div
          id="description-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.description?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="type"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Project type
        </label>

        <select
          id="type"
          name="type"
          required
          defaultValue=""
          aria-describedby="type-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>

        <div
          id="type-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.type?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="technologies"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Technologies
        </label>

        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          minLength={2}
          placeholder="Next.js, TypeScript, PostgreSQL"
          aria-describedby="technologies-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        />

        <p className="mt-2 text-sm text-gray-500">
          Enter technologies separated by commas.
        </p>

        <div
          id="technologies-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.technologies?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="yearCompleted"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Year Completed
        </label>

        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min="2000"
          max={new Date().getFullYear()}
          required
          aria-describedby="yearCompleted-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        />

        <div
          id="yearCompleted-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.yearCompleted?.map((error) => (
            <p
              key={error}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message ? (
        <p
          className="text-sm text-red-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}