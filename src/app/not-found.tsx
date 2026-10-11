import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound(){return <main id="main-content" className="wrap state-page"><p className="eyebrow">404 · A different direction</p><h1>A little<br/><em>off the facet.</em></h1><p>This page could not be found. There is still a world of Tanzanite to explore.</p><Link href="/gemstones/" className="button button-blue">Explore the collection <ArrowUpRight size={17}/></Link><Link href="/" className="text-link">Return home <ArrowUpRight size={15}/></Link></main>;}
