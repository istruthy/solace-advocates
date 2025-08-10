"use client";

import { useState, useEffect } from "react";
import { UI_CONFIG } from "@/utils/constants";

interface ScrollBannerProps {
  children: React.ReactNode;
}

export const ScrollBanner = ({ children }: ScrollBannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > UI_CONFIG.SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <h1
        id="logo"
        className={`text-3xl font-light text-[#285e50] mb-8 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "opacity-0 transform -translate-y-2"
            : "opacity-100 transform translate-y-0"
        }`}
      >
        {children}
      </h1>

      <div
        className={`fixed top-0 h-20 left-0 right-0 z-30 shadow-lg transition-all duration-300 ease-in-out transform flex items-center backdrop-blur-sm bg-[rgba(40,94,80,0.95)] ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 w-full">
          <h1 className="text-3xl font-light text-white">{children}</h1>
        </div>
      </div>

      {isScrolled && <div className="h-16 transition-all duration-300"></div>}
    </>
  );
};
