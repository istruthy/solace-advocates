"use client";

interface DegreeFilterProps {
  degrees: string[];
  currentDegree?: string;
  onDegreeChange?: (degree: string) => void;
}

export const DegreeFilter = ({
  degrees,
  currentDegree,
  onDegreeChange,
}: DegreeFilterProps) => {
  if (degrees.length === 0) return null;
  return (
    <>
      <select
        id="degree-filter"
        value={currentDegree || ""}
        onChange={e => onDegreeChange?.(e.target.value)}
        className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#285e50] focus:border-[#285e50]"
      >
        <option value="">All Degrees</option>
        {degrees.map(degree => (
          <option key={degree} value={degree}>
            {degree}
          </option>
        ))}
      </select>
    </>
  );
};
