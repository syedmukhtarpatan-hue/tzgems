export const brand = {
  name: "TZ GEMS",
  identity: "The Tanzanite Guy",
  since: "1996",
  location: "Bangkok, Thailand",
  instagram: "https://www.instagram.com/tzgems_bkk/",
  // Public business contact only. Digits with country code, without '+' or spaces.
  // null is intentional: the client requested demo mode. Never insert a fake number.
  whatsappNumber: null as string | null,
  email: null as string | null,
  siteUrl: "https://tz-gems-editorial.syedmukhtar-patan.chatgpt.site",
  demoMode: true,
  indexable: false,
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#our-story" },
  { label: "Collections", href: "/gemstones/" },
  { label: "Craftsmanship", href: "/#craftsmanship" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/#contact" },
];
