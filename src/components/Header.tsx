"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/content/brand";
import { EnquiryButton } from "./Enquiry";
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  function closeMenu() { menu.current?.close(); }
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="wrap header-inner"><Link href="/" className="wordmark" aria-label="TZ GEMS home"><span>TZ GEMS<span className="wordmark-dot">.</span></span><small>The Tanzanite Guy</small></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.label} href={item.href} aria-current={item.href === pathname || item.href === `${pathname}/` ? "page" : undefined}>{item.label}</Link>)}</nav><EnquiryButton className="header-enquiry">Let’s talk <ArrowUpRight size={16}/></EnquiryButton><button className="menu-toggle icon-button" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}><Menu size={24}/></button></div><dialog id="mobile-navigation" ref={menu} className="mobile-menu" aria-label="Navigation menu" onClose={() => setMenuOpen(false)} onClick={event => { if (event.target === event.currentTarget) closeMenu(); }}><div className="mobile-menu-inner"><button className="icon-button" onClick={closeMenu} aria-label="Close navigation menu"><X/></button><p className="eyebrow">TZ GEMS · Bangkok</p><nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link onClick={closeMenu} key={item.label} href={item.href}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={20}/></Link>)}</nav><p className="mobile-menu-note">A closer look at Tanzanite.<br/>Since 1996.</p></div></dialog></header>;
}
