export const brand = {
  name: "TZ GEMS",
  identity: "Tanzanite Gemstone & Jewellery",
  // Supply the authorised logo file here. Null renders plain business text,
  // never a reconstructed or invented TZ GEMS logo.
  logo: null as string | null,
  since: "1996",
  location: "Bangkok, Thailand",
  instagram: "https://www.instagram.com/tzgems_bkk/",
  // Public business contact only. Digits with country code, without '+' or spaces.
  // null is intentional: the client requested demo mode. Never insert a fake number.
  whatsappNumber: null as string | null,
  email: null as string | null,
  siteUrl: "https://tz-gems-editorial.syedmukhtar-patan.chatgpt.site",
  indexable: false,
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story/" },
  { label: "Tanzanite", href: "/gemstones/?category=cut-polished" },
  { label: "Collection", href: "/gemstones/" },
  { label: "Events", href: "/events/" },
  { label: "Contact", href: "/contact/" },
];
