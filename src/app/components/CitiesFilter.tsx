"use client";

interface CitiesFilterProps {
  cities: string[];
  currentCity?: string;
  onCityChange?: (city: string) => void;
}

export const CitiesFilter = ({
  cities,
  currentCity,
  onCityChange,
}: CitiesFilterProps) => {
  if (cities.length === 0) return null;

  return (
    <div>
      <select
        id="cities-filter"
        value={currentCity || ""}
        onChange={e => onCityChange?.(e.target.value)}
        className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#285e50] focus:border-[#285e50]"
      >
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};
