"use client";
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/content/products';
import { activeFilters, defaultFilters, filterLabel, filterOptions, filterProducts, parseFilters, serializeFilters, type Filters, type FacetKey } from '@/lib/catalogue';
import { EnquiryButton } from './Enquiry';
import { ProductCard } from './ProductCard';
const labels: Record<FacetKey, string> = {category:'Category',colour:'Colour',shape:'Shape',carats:'Carat weight',treatment:'Treatment',availability:'Availability'};
export function Catalogue() {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const results = useMemo(() => filterProducts(products, filters), [filters]);
  const active = activeFilters(filters);
  const [expanded, setExpanded] = useState(false);
  function update(key: keyof Filters, value: string) {
    const query = serializeFilters({ ...filters, [key]: value });
    const url = `/gemstones/${query ? `?${query}` : ''}`;
    if (key === 'q') window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  }
  function reset() { window.history.pushState(null, '', '/gemstones/'); }
  return <div className="catalogue">
    <div className="catalogue-tools"><div className="search-field"><Search size={17}/><label className="sr-only" htmlFor="gem-search">Search gemstones</label><input id="gem-search" type="search" placeholder="Search by name, shape or reference" value={filters.q} maxLength={120} onChange={event => update('q', event.target.value)}/></div><button className="filter-toggle" aria-expanded={expanded} aria-controls="catalogue-filters" onClick={() => setExpanded(value => !value)}><SlidersHorizontal size={17}/> Filters {active.length > 0 && <span>({active.length})</span>}</button><div className="sort-field"><label htmlFor="gem-sort">Sort by</label><select id="gem-sort" value={filters.sort} onChange={event => update('sort', event.target.value)}>{filterOptions.sort.map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></div></div>
    <div className="catalogue-layout"><aside id="catalogue-filters" className={`catalogue-filters ${expanded ? 'is-expanded' : ''}`} aria-label="Gemstone filters"><div className="filter-heading"><h2>Refine your view</h2><button className="reset-button" onClick={reset} disabled={active.length === 0 && filters.sort === defaultFilters.sort}>Reset all</button></div>{(['category','shape','carats','treatment','availability'] as const).map(key => <div className="filter-field" key={key}><label htmlFor={`filter-${key}`}>{labels[key]}</label><select id={`filter-${key}`} value={filters[key]} onChange={event => update(key,event.target.value)}><option value="">All {key === 'carats' ? 'weights' : key === 'availability' ? 'statuses' : key === 'category' ? 'categories' : `${labels[key].toLowerCase()}s`}</option>{filterOptions[key].map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></div>)}<fieldset className="colour-filter"><legend>Colour</legend><label><input type="radio" name="colour" value="" checked={!filters.colour} onChange={() => update('colour','')}/><span className="colour-dot all-colours"/>All colours</label>{filterOptions.colour.map(([value,label]) => <label key={value}><input type="radio" name="colour" value={value} checked={filters.colour === value} onChange={() => update('colour',value)}/><span className={`colour-dot colour-${value}`} aria-hidden="true"/>{label}</label>)}</fieldset><p className="filter-note">Unknown weights and treatments are omitted from filtered results. Demonstrations are not available stock.</p></aside>
    <div className="catalogue-results"><div className="result-heading"><p role="status" aria-live="polite" aria-atomic="true"><strong>{results.length}</strong> {results.length === 1 ? 'gemstone' : 'gemstones'}<span> / {products.length} in the showroom</span></p><span className="eyebrow">A closer look</span></div>{active.length > 0 && <div className="filter-chips" aria-label="Active filters">{active.map(key => <button key={key} onClick={() => update(key,'')} aria-label={`Remove ${filterLabel(key, filters[key])} filter`}>{filterLabel(key,filters[key])}<X size={12}/></button>)}<button className="clear-filters" onClick={reset}>Clear filters</button></div>}{results.length ? <div className="product-grid catalogue-grid">{results.map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="empty-results"><span className="eyebrow">Room for another possibility</span><h2>No gemstones<br/><em>match this view.</em></h2><p>Try fewer filters or a different search. Demo pieces have no confirmed weight, treatment, or live availability. Our specialist can help with a specific request.</p><button onClick={reset} className="button button-blue">Reset filters <X size={15}/></button><EnquiryButton className="text-link">Ask about a gemstone <ArrowUpRight size={15}/></EnquiryButton></div>}</div></div>
  </div>;
}
export function CatalogueLoading() { return <div className="catalogue-loading" aria-busy="true"><p role="status">Preparing the gemstone collection…</p><div className="skeleton-grid" aria-hidden="true"><span/><span/><span/></div></div>; }
