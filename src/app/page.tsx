import { Pagination } from "./components/Pagination";
import { ScrollBanner } from "./components/ScrollBanner";
import { getAdvocates } from "@/utils/getAdvocates";
import { getDegrees } from "@/utils/getDegrees";
import { getDistinctCities } from "@/utils/getCities";
import SearchableAdvocatesTable from "./components/SearchableAdvocatesTable";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    degree?: string;
    city?: string;
  };
}) {
  const page = Math.max(1, parseInt(searchParams.page || "1"));
  const limit = Math.min(
    Math.max(1, parseInt(searchParams.limit || "10")),
    100
  );
  const degree = searchParams.degree;
  const city = searchParams.city;

  let result;
  let degrees: string[];
  let cities: string[];

  try {
    [result, degrees, cities] = await Promise.all([
      getAdvocates(page, limit, degree, city),
      getDegrees(),
      getDistinctCities(),
    ]);
  } catch (error) {
    console.error("Error loading page data:", error);

    // Provide fallback data on error
    result = {
      data: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: null,
        previousPage: null,
      },
      filters: {
        degree: degree || null,
        city: null,
      },
      success: false,
      error: "Page load error",
      message: "Failed to load page data. Please refresh and try again.",
      timestamp: new Date().toISOString(),
    };

    degrees = [];
    cities = [];
  }

  return (
    <main className="p-6 max-w-7xl mx-auto pb-20">
      <ScrollBanner>Solace Advocates</ScrollBanner>

      {!result.success ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Database Connection Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {result.message ||
                    "Unable to connect to the database. Please check your database configuration and try again."}
                </p>
                {result.error && (
                  <p className="mt-1 text-xs text-red-600">
                    Error: {result.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SearchableAdvocatesTable
        advocates={result.data}
        degrees={degrees}
        currentDegree={degree}
        cities={cities}
        currentCity={city}
      />

      {result.success && (
        <Pagination
          currentPage={page}
          totalPages={result.pagination.totalPages}
          totalCount={result.pagination.totalCount}
          limit={limit}
        />
      )}
    </main>
  );
}
