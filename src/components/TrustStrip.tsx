import { Gem, Globe2, MapPin } from "lucide-react";
export function TrustStrip() {
  return (
    <div className="trust-strip">
      <span>
        <Gem />
        Tanzanite specialists since 1996
      </span>
      <span>
        <MapPin />
        Based in Bangkok
      </span>
      <span>
        <Globe2 />
        Worldwide shipping
      </span>
    </div>
  );
}
