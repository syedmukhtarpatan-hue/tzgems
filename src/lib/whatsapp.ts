export type EnquirySubject = { name: string; reference: string; demonstration?: boolean };
export function enquiryMessage(subject?: EnquirySubject): string {
  if (!subject) return "Hello TZ GEMS, I would like to explore your Tanzanite gemstones. Could you please share more information and current availability?";
  if (subject.demonstration) return `Hello TZ GEMS, I like the style shown in your ${subject.name} demonstration (Ref: ${subject.reference}). Could you share similar genuine Tanzanite options and current availability?`;
  return `Hello TZ GEMS, I'm interested in the ${subject.name} (Ref: ${subject.reference}). Could you please share more information and availability?`;
}
export function whatsappHref(number: string | null | undefined, message: string): string | null {
  if (!number) return null;
  const digits = number.trim().replace(/[+\s()-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
