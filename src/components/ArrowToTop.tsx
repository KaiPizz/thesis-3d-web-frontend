import { useEffect, useState } from "react";

export default function BackToTop({ showAfter = 300 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const goTop = () => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={goTop}
      className={[
        "fixed bottom-6 right-6 z-50 rounded-full p-3",
        "bg-black text-white shadow-lg ring-1 ring-black/10",
        "hover:bg-black/90 focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black",
        "transition-opacity",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Up arrow icon */}
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
