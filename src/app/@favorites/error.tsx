"use client";

// Boilerplate error component

export const FavoritesError = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex items-center justify-center p-6 min-h-[400px]">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong!
        </h3>
        <p className="text-gray-600 mb-4">
          {error.message || "Failed to load favorites"}
        </p>
      </div>
    </div>
  );
};
