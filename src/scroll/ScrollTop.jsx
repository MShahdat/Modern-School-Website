import React, { useEffect, useState } from "react";

const ScrollToTop = ({ showAfter = 200 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={goTop}
      aria-label="Scroll to top"
      className="max-w-7xl mx-auto fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-blue-900 text-white shadow-lg
                 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-white/60
                 flex items-center justify-center transition animate-bounce"
    >
      {/* Up arrow icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
