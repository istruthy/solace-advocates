"use client";

import { useState, useEffect } from "react";
import { FavoritesToggle } from "./FavoritesToggle";

interface FavoritesPanelProps {
  children: React.ReactNode;
}

export const FavoritesPanel = ({ children }: FavoritesPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-50 border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-200 bg-white px-4 lg:px-6 py-4 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
              <p className="text-sm text-gray-600 mt-1">Your saved advocates</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>

      <FavoritesToggle isOpen={isOpen} onToggle={handleToggle} />
    </>
  );
};
