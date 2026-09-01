export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-900 py-6 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Millen&apos;s Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}