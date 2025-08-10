import { Chip, TableHeader, TableRow, SearchForm } from "@/app/components/";
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
  const filteredAdvocates = advocates;

  return (
    <div>
      <SearchForm
        degrees={degrees}
        currentDegree={currentDegree}
        cities={cities}
        currentCity={currentCity}
        currentSearch={currentSearch}
      />

      {advocates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
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
                <TableHeader textAlign="text-left" widthClass="w-[20%]">
                  Advocate
                </TableHeader>
                <TableHeader>Specialties</TableHeader>
                <TableHeader>Experience</TableHeader>
                <TableHeader widthClass="w-[12%]">Contact</TableHeader>
                <TableHeader>{""}</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map(advocate => (
                <tr
                  key={advocate.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <TableRow>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {advocate.firstName} {advocate.lastName},{" "}
                        {advocate.degree}
                      </div>
                      <div className="text-sm text-gray-600">
                        {advocate.city}
                      </div>
                    </div>
                  </TableRow>
                  <TableRow>
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, index) => (
                        <Chip key={index}>{specialty}</Chip>
                      ))}
                    </div>
                  </TableRow>
                  <TableRow>{advocate.yearsOfExperience}</TableRow>
                  <TableRow>
                    {formatPhoneNumber(advocate.phoneNumber.toString()) ||
                      advocate.phoneNumber}
                  </TableRow>
                  <TableRow>
                    <button
                      className="text-gray-400 hover:text-[#285e50] transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                      title="Add to favorites"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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
