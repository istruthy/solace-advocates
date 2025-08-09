interface FavoritesToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const FavoritesToggle = ({ isOpen, onToggle }: FavoritesToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 text-white p-3 rounded-full shadow-lg transition-colors ${
        isOpen
          ? "bg-[#285e50] hover:bg-[#285e50]/80"
          : "bg-[#d7a13b] hover:bg-[#d7a13b]/80"
      }`}
    >
      {isOpen ? (
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
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};
