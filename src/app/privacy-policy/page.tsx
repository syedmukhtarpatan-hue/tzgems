import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Privacy Policy — Draft",
  description:
    "Editable privacy policy draft for the TZ GEMS catalogue design preview. Business review is required before launch.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: false, follow: false },
};
export default function PrivacyPage() {
  return (
    <main id="main-content" className="wrap page-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy/" },
        ]}
      />
      <article className="policy">
        <p className="eyebrow">EDITABLE DRAFT · BUSINESS REVIEW REQUIRED</p>
        <h1>Privacy Policy</h1>
        <p>
          This draft describes the current TZ GEMS design preview. It must be
          reviewed and completed for the actual hosting service, business
          contact details and applicable obligations before a public launch.
        </p>
        <h2>About this website</h2>
        <p>
          TZ GEMS is a Tanzanite gemstone business based in Bangkok, Thailand.
          This catalogue lets visitors browse demonstration gemstones and
          prepare enquiries.
        </p>
        <h2>Information in this preview</h2>
        <p>
          There is no account, checkout or contact submission form. Search and
          filter selections are stored in the page URL. The enquiry preview
          creates a message in your browser; it does not transmit that message
          to TZ GEMS. Copying an enquiry uses your browser clipboard only when
          you select that action.
        </p>
        <h2>External services</h2>
        <p>
          Instagram links take you to Instagram. When an official WhatsApp
          number is configured, enquiry links will open WhatsApp with a prepared
          message. Those services apply their own privacy policies. You choose
          whether to send a message there.
        </p>
        <h2>Cookies, hosting and analytics</h2>
        <p>
          This implementation does not add advertising trackers or analytics
          cookies. The chosen hosting provider may process connection
          information or set necessary access cookies. The final policy must
          identify the host, its practices, any retention periods and any
          additional services enabled at launch.
        </p>
        <h2>Enquiry handling and your choices</h2>
        <p>
          Any handling of messages received through external services must be
          documented by TZ GEMS, including retention, access requests and
          deletion requests. These business practices have not yet been
          supplied.
        </p>
        <h2>Contact and changes</h2>
        <p>
          Use the{" "}
          <Link className="text-link" href="/contact/">
            Contact page
          </Link>{" "}
          to reach TZ GEMS. A verified privacy contact, responsible legal
          entity, postal address and effective date must be added before this
          policy is finalised.
        </p>
      </article>
    </main>
  );
}
