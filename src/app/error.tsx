"use client";
import Link from 'next/link';
export default function ErrorPage({reset}:{error:Error & {digest?:string};reset:()=>void}){return <main id="main-content" className="wrap state-page"><p className="eyebrow">An unexpected pause</p><h1>Let’s try<br/><em>that again.</em></h1><p role="alert">This page could not be displayed. Please try again or return to the collection.</p><button onClick={reset} className="button button-blue">Try again</button><Link className="text-link" href="/gemstones/">Back to the collection</Link></main>;}
