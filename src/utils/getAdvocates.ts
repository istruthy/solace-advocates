import { Advocate } from "@/types/advocate";
import { config } from "./config";

const createErrorResponse = (
  page: number,
  limit: number,
  degree?: string,
  city?: string,
  search?: string,
  error?: string,
  message?: string
) => ({
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
    city: city || null,
    search: search || null,
  },
  success: false,
  error: error || "Unknown error",
  message: message || "Failed to fetch advocates",
  timestamp: new Date().toISOString(),
});

export const getAdvocates = async (
  page: number = 1,
  limit: number = 10,
  degree?: string,
  city?: string,
  search?: string
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (degree) {
      params.append("degree", degree);
    }

    if (city) {
      params.append("city", city);
    }

    if (search) {
      params.append("search", search);
    }

    const response = await fetch(
      `${config.apiUrl}/api/advocates?${params.toString()}`
    );

    if (!response.ok) {
      console.error(`Error fetching advocates: ${response.status}`);
      return createErrorResponse(
        page,
        limit,
        degree,
        city,
        search,
        `HTTP ${response.status}`
      );
    }

    const result = await response.json();

    if (!result.success) {
      console.error("API returned error:", result.error);
      return createErrorResponse(
        page,
        limit,
        degree,
        city,
        search,
        result.error,
        result.message
      );
    }

    return {
      ...result,
      data: result.data.map(
        (advocate: Advocate): Advocate => ({
          ...advocate,
          specialties: Array.isArray(advocate.specialties)
            ? advocate.specialties
            : [],
        })
      ),
    };
  } catch (error) {
    console.error("Error in getAdvocates:", error);
    return createErrorResponse(
      page,
      limit,
      degree,
      city,
      search,
      "Network error",
      error instanceof Error ? error.message : "Failed to fetch advocates"
    );
  }
};
