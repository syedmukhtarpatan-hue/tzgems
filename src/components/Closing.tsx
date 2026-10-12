import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function Closing() {
  return (
    <section className="closing">
      <div className="wrap">
        <p className="eyebrow">A PERSONAL CONVERSATION</p>
        <h2>
          Find your shade
          <br />
          of extraordinary.
        </h2>
        <p>Speak with TZ GEMS about your next Tanzanite.</p>
        <Link href="/contact/" className="button white">
          Contact Us <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
