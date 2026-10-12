"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="wrap state-page">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>Let’s try that again.</h1>
      <p role="alert">This page could not be displayed.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
      <Link className="text-link" href="/gemstones/">
        Back to the collection
      </Link>
    </main>
  );
}
