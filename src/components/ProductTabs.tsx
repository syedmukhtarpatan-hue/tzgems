"use client";
import { useRef, useState } from "react";
export function ProductTabs({ description }: { description: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = [
    { label: "Description", content: description },
    {
      label: "Certification",
      content:
        "No gemological report has been supplied for this demonstration. For a genuine gemstone, ask which independent reports are available and review the report for that specific stone before making a decision.",
    },
    {
      label: "Shipping",
      content:
        "TZ GEMS is based in Bangkok and welcomes worldwide enquiries. Please confirm delivery availability, insurance, timing, costs and any import requirements with the team for your destination. No purchase or shipping is arranged through this website.",
    },
  ];
  return (
    <div className="product-tabs">
      <div role="tablist" aria-label="Gemstone information">
        {tabs.map((tab, i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            key={tab.label}
            id={`tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight") next = (i + 1) % 3;
              else if (e.key === "ArrowLeft") next = (i + 2) % 3;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 2;
              else return;
              e.preventDefault();
              setActive(next);
              refs.current[next]?.focus();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          id={`panel-${i}`}
          key={tab.label}
          role="tabpanel"
          aria-labelledby={`tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
        >
          <p>{tab.content}</p>
        </div>
      ))}
    </div>
  );
}
