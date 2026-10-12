"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { products } from "@/content/products";
import {
  activeFilters,
  filterLabel,
  filterOptions,
  filterProducts,
  parseFilters,
  serializeFilters,
  type Filters,
  type FacetKey,
} from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";
const labels: Record<FacetKey, string> = {
  category: "Stone type",
  shape: "Shape",
  carats: "Carat weight",
  treatment: "Treatment",
  colour: "Colour",
  availability: "Availability",
};
export function Catalogue() {
  const params = useSearchParams();
  const filters = useMemo(
    () => parseFilters(new URLSearchParams(params.toString())),
    [params],
  );
  const results = useMemo(() => filterProducts(products, filters), [filters]);
  const [expanded, setExpanded] = useState(false);
  const active = activeFilters(filters);
  const size = params.get("size") === "6" ? 6 : 9;
  const pages = Math.max(1, Math.ceil(results.length / size));
  const requestedPage = Number(params.get("page") || 1);
  const page = Math.min(
    pages,
    Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1),
  );
  function navigate(query: URLSearchParams, replace = false) {
    window.history[replace ? "replaceState" : "pushState"](
      null,
      "",
      `/gemstones/${query.size ? `?${query}` : ""}`,
    );
  }
  function update(key: keyof Filters, value: string) {
    const query = new URLSearchParams(
      serializeFilters({ ...filters, [key]: value }),
    );
    if (size === 6) query.set("size", "6");
    navigate(query, key === "q");
  }
  function setPage(value: number) {
    const query = new URLSearchParams(params.toString());
    query.set("page", String(value));
    navigate(query);
    document
      .getElementById("collection-results")
      ?.scrollIntoView({ block: "start", behavior: "instant" });
  }
  function reset() {
    navigate(new URLSearchParams());
  }
  return (
    <div className="catalogue">
      <div className="mobile-filter-bar">
        <button
          className="button outline"
          aria-expanded={expanded}
          aria-controls="catalogue-filters"
          onClick={() => setExpanded(!expanded)}
        >
          <SlidersHorizontal size={16} />
          Filters{active.length ? ` (${active.length})` : ""}
        </button>
        <label className="mobile-sort">
          <span className="sr-only">Sort gemstones</span>
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            {filterOptions.sort.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className={`filter-toolbar ${expanded ? "is-expanded" : ""}`}
        id="catalogue-filters"
        aria-label="Gemstone filters"
      >
        {(Object.keys(labels) as FacetKey[]).map((key) => (
          <label className="filter-field" key={key}>
            <span className="sr-only">{labels[key]}</span>
            <select
              value={filters[key]}
              onChange={(e) => update(key, e.target.value)}
              aria-label={labels[key]}
            >
              <option value="">{labels[key]}</option>
              {filterOptions[key].map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="search-sort-row">
        <div className="search-field">
          <Search size={18} />
          <label className="sr-only" htmlFor="gem-search">
            Search gemstones
          </label>
          <input
            id="gem-search"
            type="search"
            value={filters.q}
            maxLength={120}
            placeholder="Search by name, shape or reference"
            onChange={(e) => update("q", e.target.value)}
          />
        </div>
        <label className="desktop-sort">
          Sort:
          <select
            aria-label="Sort by"
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            {filterOptions.sort.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="collection-result-line" id="collection-results">
        <p role="status">
          {results.length} {results.length === 1 ? "gemstone" : "gemstones"}
        </p>
        <p>Illustrative collection · availability on enquiry</p>
      </div>
      {active.length > 0 && (
        <div className="filter-chips">
          {active.map((key) => (
            <button
              key={key}
              onClick={() => update(key, "")}
              aria-label={`Remove ${filterLabel(key, filters[key])} filter`}
            >
              {filterLabel(key, filters[key])}
              <X size={14} />
            </button>
          ))}
          <button onClick={reset}>Clear all</button>
        </div>
      )}
      {results.length ? (
        <div className="product-grid catalogue-grid">
          {results.slice((page - 1) * size, page * size).map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <Search size={28} />
          <h2>No gemstones match your search.</h2>
          <p>
            Try another search or fewer filters. Demonstration stones have no
            verified carat weight, treatment or live availability.
          </p>
          <button className="button primary" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
      <div className="pagination-row">
        <label>
          Show
          <select
            aria-label="Gemstones per page"
            value={size}
            onChange={(e) => {
              const query = new URLSearchParams(params.toString());
              query.set("size", e.target.value);
              query.delete("page");
              navigate(query);
            }}
          >
            <option value="9">9 per page</option>
            <option value="6">6 per page</option>
          </select>
        </label>
        <nav className="pagination" aria-label="Collection pagination">
          <button
            className="icon-button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft size={16} />
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-label={`Page ${i + 1}`}
              aria-current={page === i + 1 ? "page" : undefined}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="icon-button"
            aria-label="Next page"
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
          >
            <ArrowRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}
export function CatalogueLoading() {
  return (
    <p className="loading-state" role="status">
      Preparing the collection…
    </p>
  );
}
