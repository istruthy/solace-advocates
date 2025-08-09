"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "./SearchBar";
import TableHeader from "@/app/components/TableHeader";
import TableRow from "@/app/components/TableRow";
import { Advocate } from "@/types/advocate";
import { formatPhoneNumber } from "@/utils/phoneNumber";

interface SearchableAdvocatesTableProps {
  advocates: Advocate[];
  degrees?: string[];
  currentDegree?: string;
  cities?: string[];
  currentCity?: string;
  currentSearch?: string;
}

export default function SearchableAdvocatesTable({
  advocates,
  degrees = [],
  currentDegree,
  cities = [],
  currentCity,
  currentSearch,
}: SearchableAdvocatesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredAdvocates, setFilteredAdvocates] =
    useState<Advocate[]>(advocates);

  useEffect(() => {
    setFilteredAdvocates(advocates);
  }, [advocates]);

  const updateParamsAndNavigate = useCallback(
    (paramUpdates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(paramUpdates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      params.set("page", "1");

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleDegreeChange = useCallback(
    (degree: string) => {
      updateParamsAndNavigate({ degree: degree || null });
    },
    [updateParamsAndNavigate]
  );

  const handleCityChange = useCallback(
    (city: string) => {
      updateParamsAndNavigate({ city: city || null });
    },
    [updateParamsAndNavigate]
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      updateParamsAndNavigate({ search: search || null });
    },
    [updateParamsAndNavigate]
  );

  const handleReset = useCallback(() => {
    updateParamsAndNavigate({ degree: null, city: null, search: null });
  }, [updateParamsAndNavigate]);

  const handleSearchResults = useCallback((results: Advocate[]) => {
    setFilteredAdvocates(results);
  }, []);

  return (
    <div>
      <SearchBar
        advocates={advocates}
        onSearchResults={handleSearchResults}
        onReset={handleReset}
        degrees={degrees}
        currentDegree={currentDegree}
        onDegreeChange={handleDegreeChange}
        cities={cities}
        currentCity={currentCity}
        onCityChange={handleCityChange}
        currentSearch={currentSearch}
        onSearchChange={handleSearchChange}
      />

      {advocates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No advocates available
          </h3>
          <p className="text-sm text-gray-600">
            There are currently no advocates in the database. Please check your
            database connection.
          </p>
        </div>
      ) : filteredAdvocates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No advocates found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#285e50]/10 h-10 border-b border-gray-300 text-[#285e50]">
                <TableHeader>First</TableHeader>
                <TableHeader>Last</TableHeader>
                <TableHeader>City</TableHeader>
                <TableHeader>Degree</TableHeader>
                <TableHeader>Specialties</TableHeader>
                <TableHeader>Experience</TableHeader>
                <TableHeader>Contact</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map(advocate => (
                <tr
                  key={advocate.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <TableRow>{advocate.firstName}</TableRow>
                  <TableRow>{advocate.lastName}</TableRow>
                  <TableRow>{advocate.city}</TableRow>
                  <TableRow>{advocate.degree}</TableRow>
                  <TableRow>
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-[rgba(67,130,113,0.5)] text-[rgba(67, 130, 113, 0.2)] text-xs px-2 py-1 rounded-2xl"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </TableRow>
                  <TableRow>{advocate.yearsOfExperience}</TableRow>
                  <TableRow>
                    {formatPhoneNumber(advocate.phoneNumber.toString()) ||
                      advocate.phoneNumber}
                  </TableRow>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
