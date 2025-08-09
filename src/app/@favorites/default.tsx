import { Suspense } from "react";
import { Advocate } from "@/types/advocate";
import { Chip } from "../components/Chip";

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
          className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">
              Dr. {favorite.firstName} {favorite.lastName}
            </h3>
            <button className="text-gray-500 hover:text-black text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{favorite.city}</p>
          <p className="text-sm text-gray-600 mb-2">
            {favorite.degree} • {favorite.yearsOfExperience} years
          </p>
          <div className="flex flex-wrap gap-1">
            {favorite.specialties.map((specialty, index) => (
              <Chip
                key={index}

              >
                {specialty}
              </Chip>
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
