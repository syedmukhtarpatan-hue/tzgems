"use client";
import { createContext, useContext, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Camera, MessageCircle, X } from "lucide-react";
import { brand } from "@/content/brand";
import { enquiryMessage, whatsappHref, type EnquirySubject } from "@/lib/whatsapp";
const EnquiryContext = createContext<(subject?: EnquirySubject) => void>(() => {});

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState(enquiryMessage());
  const [copyStatus, setCopyStatus] = useState("");
  function open(subject?: EnquirySubject) { setMessage(enquiryMessage(subject)); setCopyStatus(""); dialog.current?.showModal(); }
  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopyStatus("Enquiry copied."); }
    catch { messageField.current?.focus(); messageField.current?.select(); setCopyStatus("Select and copy the message above."); }
  }
  return <EnquiryContext.Provider value={open}>
    {children}
    <EnquiryButton className="floating-enquiry" label="Open WhatsApp enquiry"><MessageCircle size={20}/><span>Enquire <small>{brand.whatsappNumber ? "WhatsApp" : "WhatsApp demo"}</small></span></EnquiryButton>
    <dialog ref={dialog} className="enquiry-dialog" aria-labelledby="enquiry-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-inner"><button className="icon-button close-dialog" onClick={() => dialog.current?.close()} aria-label="Close enquiry"><X size={22}/></button><p className="eyebrow">A personal conversation · Demo mode</p><h2 id="enquiry-title">Let’s talk<br/><em>Tanzanite.</em></h2><p>Our WhatsApp number is awaiting configuration. Copy your enquiry and reach us through our Instagram account in the meantime.</p><label className="field-label" htmlFor="enquiry-message">Your prepared enquiry</label><textarea id="enquiry-message" ref={messageField} value={message} readOnly rows={5}/><div className="dialog-actions"><button className="button button-blue" onClick={copy}>{copyStatus === "Enquiry copied." ? <Check size={16}/> : <Copy size={16}/>} Copy enquiry</button><a className="text-link" href={brand.instagram} target="_blank" rel="noopener noreferrer"><Camera size={16}/> Visit Instagram <ArrowUpRight size={15}/></a></div><p className="copy-status" role="status">{copyStatus}</p></div>
    </dialog>
  </EnquiryContext.Provider>;
}
export function EnquiryButton({ subject, children = "Enquire", className = "", label }: { subject?: EnquirySubject; children?: React.ReactNode; className?: string; label?: string }) {
  const open = useContext(EnquiryContext);
  const href = whatsappHref(brand.whatsappNumber, enquiryMessage(subject));
  const ariaLabel = label || (subject ? `Enquire about ${subject.name} (${subject.reference})` : undefined);
  return href ? <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">{children}</a> : <button type="button" className={className} aria-label={ariaLabel} onClick={() => open(subject)}>{children}</button>;
}
