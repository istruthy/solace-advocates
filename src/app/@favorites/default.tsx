import { Suspense } from "react";
import { Advocate } from "@/types/advocate";

// Mock favorites data

const mockFavorites: Advocate[] = [
  {
    id: 1,
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    city: "New York",
    degree: "MD",
    specialties: ["Cardiology", "Internal Medicine"],
    yearsOfExperience: 15,
    phoneNumber: 5551234567,
    createdAt: new Date(),
  },
  {
    id: 3,
    firstName: "Dr. Michael",
    lastName: "Chen",
    city: "San Francisco",
    degree: "MD",
    specialties: ["Pediatrics"],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
    createdAt: new Date(),
  },
];

function FavoritesList() {
  if (mockFavorites.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg mb-2">No favorites yet</p>
        <p className="text-sm">
          Add advocates to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {mockFavorites.map(favorite => (
        <div
          key={favorite.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">
              Dr. {favorite.firstName} {favorite.lastName}
            </h3>
            <button className="text-red-500 hover:text-red-700 text-sm">
              Remove
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{favorite.city}</p>
          <p className="text-sm text-gray-600 mb-2">
            {favorite.degree} • {favorite.yearsOfExperience} years
          </p>
          <div className="flex flex-wrap gap-1">
            {favorite.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoritesSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="flex gap-1">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Favorites() {
  return (
    <Suspense fallback={<FavoritesSkeleton />}>
      <FavoritesList />
    </Suspense>
  );
}
