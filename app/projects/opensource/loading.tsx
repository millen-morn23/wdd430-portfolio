export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 animate-pulse">
      <section className="mb-12 text-center">
        <div className="mx-auto h-10 w-80 rounded bg-slate-200" />
        <div className="mx-auto mt-4 h-5 w-full max-w-2xl rounded bg-slate-200" />
        <div className="mx-auto mt-2 h-5 w-5/6 max-w-2xl rounded bg-slate-200" />
      </section>

      <section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-48 rounded-lg bg-slate-200" />
          <div className="h-48 rounded-lg bg-slate-200" />
        </div>
      </section>
    </main>
  );
}