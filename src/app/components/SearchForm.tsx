"use client";

import { useEffect, useState } from "react";
import { useUrlParams } from "@/hooks";
import { FilterSelectField } from "./FilterSelectField";

interface SearchFormProps {
  degrees?: string[];
  currentDegree?: string;
  cities?: string[];
  currentCity?: string;
  currentSearch?: string;
}

export function SearchForm({
  degrees = [],
  currentDegree,
  cities = [],
  currentCity,
  currentSearch,
}: SearchFormProps) {
  const { updateParams, clearParams, timeoutRef } = useUrlParams();

  const [searchValue, setSearchValue] = useState(currentSearch || "");
  const [degreeValue, setDegreeValue] = useState(currentDegree || "");
  const [cityValue, setCityValue] = useState(currentCity || "");

  useEffect(() => {
    setSearchValue(currentSearch || "");
    setDegreeValue(currentDegree || "");
    setCityValue(currentCity || "");
  }, [currentSearch, currentDegree, currentCity]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    updateParams({ search: value || null });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "degree") {
      setDegreeValue(value);
    } else if (name === "city") {
      setCityValue(value);
    }

    updateParams({ [name]: value || null });
  };

  const handleClear = () => {
    setSearchValue("");
    setDegreeValue("");
    setCityValue("");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear search filters and reset to page 1, but preserve limit
    updateParams({
      search: null,
      degree: null,
      city: null,
      page: "1" // Reset to first page
    }, false); // Don't debounce the clear action
  };

  useEffect(() => {
    const timeout = timeoutRef.current;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeoutRef]);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            id="search"
            name="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search advocates..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#285e50] focus:border-transparent"
          />
        </div>
        <div>
          <FilterSelectField
            id="degree"
            name="degree"
            value={degreeValue}
            onChange={handleSelectChange}
            options={degrees}
            filterType="degree"
            placeholder="All Degrees"
          />
        </div>

        <div>
          <FilterSelectField
            id="city"
            name="city"
            value={cityValue}
            onChange={handleSelectChange}
            options={cities}
            filterType="city"
            placeholder="All Cities"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleClear}
            className="w-full px-4 py-2 bg-[rgba(67,130,113,0.9)] text-white rounded-md hover:bg-[rgba(67,130,113)] transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
}
