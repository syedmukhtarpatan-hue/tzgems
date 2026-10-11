import { ArrowUpRight } from "lucide-react";
import { copy } from "@/content/copy";
import { EnquiryButton } from "./Enquiry";
export function Closing() {
  return <section id="contact" className="closing"><div className="wrap closing-inner"><p className="eyebrow">Your next chapter</p><h2>Searching for<br/>Something <em>Exceptional?</em></h2><p className="closing-copy">{copy.closing.text}</p><EnquiryButton className="button button-ivory">Enquire via WhatsApp <ArrowUpRight size={17}/></EnquiryButton><p className="closing-note">A personal conversation, from Bangkok to you.</p></div><span className="closing-watermark" aria-hidden="true">TZ</span></section>;
}
