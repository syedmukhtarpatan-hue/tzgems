"use client";
import { wrapDialogFocus } from "@/lib/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Globe2,
  Camera,
  MapPin,
  Menu,
  Search,
  X,
} from "lucide-react";
import { brand, navigation } from "@/content/brand";
import { Brand } from "./Brand";
export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  function close() {
    menu.current?.close();
  }
  const links = navigation.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      aria-current={item.href === pathname ? "page" : undefined}
      onClick={close}
    >
      {item.label}
    </Link>
  ));
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <button
          className="icon-button menu-toggle"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            menu.current?.showModal();
            setOpen(true);
          }}
        >
          <Menu size={23} />
        </button>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <Link className="button primary header-contact" href="/contact/">
          Contact Us <ArrowRight size={15} />
        </Link>
        <Link
          className="icon-button mobile-search"
          href="/gemstones/?search=1"
          aria-label="Search gemstones"
        >
          <Search size={22} />
        </Link>
      </div>
      <dialog
        onKeyDown={wrapDialogFocus}
        ref={menu}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-header">
          <Brand />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close navigation menu"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">{links}</nav>
        <div className="menu-contact">
          <span>
            <MapPin />
            Bangkok, Thailand
          </span>
          <span>
            <Globe2 />
            Worldwide shipping
          </span>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
            <Camera />
            @tzgems_bkk
          </a>
        </div>
      </dialog>
    </header>
  );
}
