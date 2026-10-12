import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="wrap state-page">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>
        A different path
        <br />
        to something rare.
      </h1>
      <p>
        We couldn’t find this page. Explore the collection or get in touch with
        TZ GEMS.
      </p>
      <Link className="button primary" href="/gemstones/">
        Explore Collection
      </Link>
    </main>
  );
}
