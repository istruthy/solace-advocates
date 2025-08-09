"use client";

import { useState, useEffect, useRef } from "react";
import { Advocate } from "@/types/advocate";
import { DegreeFilter } from "./DegreeFilter";
import { CitiesFilter } from "./CitiesFilter";

interface SearchBarProps {
  advocates: Advocate[];
  onSearchResults: (results: Advocate[]) => void;
  onSearchTermChange?: (term: string) => void;
  searchTerm?: string;
  onSearchClear?: () => void;
  onReset?: () => void;
  degrees?: string[];
  currentDegree?: string;
  onDegreeChange?: (degree: string) => void;
  cities?: string[];
  currentCity?: string;
  onCityChange?: (city: string) => void;
  currentSearch?: string;
  onSearchChange?: (search: string) => void;
}

export const SearchBar = ({
  advocates,
  onSearchResults,
  onSearchTermChange,
  searchTerm: externalSearchTerm,
  onSearchClear,
  onReset,
  degrees = [],
  currentDegree,
  onDegreeChange,
  cities = [],
  currentCity,
  onCityChange,
  currentSearch,
  onSearchChange,
}: SearchBarProps) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState(
    externalSearchTerm || currentSearch || ""
  );
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const searchTerm =
    externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (currentSearch !== undefined) {
      setInternalSearchTerm(currentSearch);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!searchTerm.trim()) {
      if (mountedRef.current) {
        setIsSearching(false);
        onSearchResults(advocates);
        if (onSearchClear) {
          onSearchClear();
        }
      }
      return;
    }

    if (mountedRef.current) {
      setIsSearching(true);
    }

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      if (mountedRef.current) {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, advocates]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;

    if (onSearchChange) {
      onSearchChange(newTerm);
    } else if (onSearchTermChange) {
      onSearchTermChange(newTerm);
    } else {
      setInternalSearchTerm(newTerm);
    }
  };

  const handleReset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (mountedRef.current) {
      setIsSearching(false);
      if (onSearchChange) {
        onSearchChange("");
      } else if (onSearchTermChange) {
        onSearchTermChange("");
      } else {
        setInternalSearchTerm("");
      }
      onSearchResults(advocates);
      if (onSearchClear) {
        onSearchClear();
      }
      if (onDegreeChange) {
        onDegreeChange("");
      }
      if (onCityChange) {
        onCityChange("");
      }
      if (onReset) {
        onReset();
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search for your advocate"
          className="border border-gray-300 rounded focus:ring-[#285050] focus:border-[#285050] px-3 py-2 flex-1"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <DegreeFilter
          degrees={degrees}
          currentDegree={currentDegree}
          onDegreeChange={onDegreeChange}
        />
        <CitiesFilter
          cities={cities}
          currentCity={currentCity}
          onCityChange={onCityChange}
        />
        <button
          onClick={handleReset}
          className="bg-[#285e50] text-white px-4 py-2 rounded hover:bg-[#285e50]/80 transition-colors"
        >
          Reset Search
        </button>
      </div>
      <div className="my-6 mb-2">
        {searchTerm ? (
          <span className="my-6 text-xl font-light mb-2 text-[#285e50]/60">
            Searching for:{" "}
          </span>
        ) : (
          <span className="my-6 text-xl font-light mb-2 text-[#285e50]/60">
            Viewing:{" "}
          </span>
        )}
        <span className="font-bold text-xl text-[#285e50]">
          {searchTerm.trim() ? `"${searchTerm}"` : "All advocates"}
        </span>
        {isSearching && (
          <span className="ml-2 text-blue-500">Searching...</span>
        )}
      </div>
    </div>
  );
};
