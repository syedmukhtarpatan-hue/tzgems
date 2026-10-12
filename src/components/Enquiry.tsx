"use client";
import { wrapDialogFocus } from "@/lib/dialog";
import { createContext, useContext, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Camera,
  MessageCircle,
  X,
} from "lucide-react";
import { brand } from "@/content/brand";
import {
  enquiryMessage,
  whatsappHref,
  type EnquirySubject,
} from "@/lib/whatsapp";
const EnquiryContext = createContext<(subject?: EnquirySubject) => void>(
  () => {},
);
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState(enquiryMessage());
  const [status, setStatus] = useState("");
  function open(subject?: EnquirySubject) {
    setMessage(enquiryMessage(subject));
    setStatus("");
    dialog.current?.showModal();
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Enquiry copied. No message has been sent.");
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus("Select and copy the message above. No message has been sent.");
    }
  }
  return (
    <EnquiryContext.Provider value={open}>
      {children}
      <dialog
        onKeyDown={wrapDialogFocus}
        ref={dialog}
        className="enquiry-dialog"
        aria-labelledby="enquiry-title"
        aria-describedby="enquiry-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="icon-button close-dialog"
            aria-label="Close enquiry"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          <MessageCircle className="dialog-icon" />
          <p className="eyebrow">WHATSAPP · DEMO MODE</p>
          <h2 id="enquiry-title">Let’s talk Tanzanite.</h2>
          <p id="enquiry-description">
            The official WhatsApp number is not connected yet. Your enquiry is
            ready to copy. You can contact TZ GEMS on Instagram in the meantime.
          </p>
          <label htmlFor="enquiry-message">Your prepared enquiry</label>
          <textarea
            ref={field}
            id="enquiry-message"
            value={message}
            readOnly
            rows={6}
          />
          <button className="button primary" onClick={copy}>
            {status.startsWith("Enquiry copied") ? (
              <Check size={17} />
            ) : (
              <Copy size={17} />
            )}
            Copy enquiry
          </button>
          <a
            className="text-link"
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={17} />
            Visit Instagram
            <ArrowUpRight size={15} />
          </a>
          <p className="copy-status" role="status">
            {status || "Nothing is sent from this preview."}
          </p>
        </div>
      </dialog>
    </EnquiryContext.Provider>
  );
}
export function EnquiryButton({
  subject,
  children = "Enquire on WhatsApp",
  className = "",
  label,
}: {
  subject?: EnquirySubject;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const open = useContext(EnquiryContext);
  const href = whatsappHref(brand.whatsappNumber, enquiryMessage(subject));
  const ariaLabel =
    label ||
    (subject
      ? `Enquire on WhatsApp about ${subject.name} (${subject.reference})`
      : undefined);
  return href ? (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => open(subject)}
    >
      {children}
    </button>
  );
}
