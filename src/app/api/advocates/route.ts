import db from "@/db";
import { advocates } from "@/db/schema";

// Helper function to create default error response
const createErrorResponse = (
  page: number,
  limit: number,
  degree?: string,
  city?: string,
  search?: string,
  error?: string,
  message?: string
) => ({
  error: error || "Unknown error",
  message: message || "Failed to fetch advocates",
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
  timestamp: new Date().toISOString(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      Math.max(1, parseInt(searchParams.get("limit") || "10")),
      100
    );
    const degree = searchParams.get("degree");
    const city = searchParams.get("city");
    const search = searchParams.get("search");

    // Check if database is configured
    if (!db || typeof db.select !== "function") {
      return Response.json(
        createErrorResponse(
          page,
          limit,
          degree || undefined,
          city || undefined,
          search || undefined,
          "Database not configured",
          "Please check your database configuration"
        ),
        { status: 503 }
      );
    }

    try {
      // Get all data first (for now, we'll implement proper filtering later)
      const allData = await db.select().from(advocates);

      // Apply filters in memory for now
      let filteredData = allData;

      if (degree) {
        filteredData = filteredData.filter(advocate =>
          advocate.degree.toLowerCase().includes(degree.toLowerCase())
        );
      }

      if (city) {
        filteredData = filteredData.filter(advocate =>
          advocate.city.toLowerCase().includes(city.toLowerCase())
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(advocate =>
          advocate.firstName.toLowerCase().includes(searchLower) ||
          advocate.lastName.toLowerCase().includes(searchLower) ||
          advocate.city.toLowerCase().includes(searchLower) ||
          advocate.degree.toLowerCase().includes(searchLower) ||
          (Array.isArray(advocate.specialties) && 
           advocate.specialties.some(specialty =>
             specialty.toLowerCase().includes(searchLower)
           )) ||
          advocate.yearsOfExperience.toString().includes(searchLower) ||
          advocate.phoneNumber.toString().includes(searchLower)
        );
      }

      // Sort the data
      filteredData.sort((a, b) => {
        const lastNameCompare = a.lastName.localeCompare(b.lastName);
        return lastNameCompare !== 0 ? lastNameCompare : a.firstName.localeCompare(b.firstName);
      });

      const totalCount = filteredData.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const data = filteredData.slice(startIndex, endIndex);

      return Response.json({
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        },
        filters: {
          degree: degree || null,
          city: city || null,
          search: search || null,
        },
        success: true,
        timestamp: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error("Database connection error:", dbError);

      return Response.json(
        createErrorResponse(
          page,
          limit,
          degree || undefined,
          city || undefined,
          search || undefined,
          "Database connection failed",
          "Unable to connect to the database. Please try again later."
        ),
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error fetching advocates:", error);

    return Response.json(
      createErrorResponse(
        1,
        10,
        undefined,
        undefined,
        undefined,
        "Failed to fetch advocates",
        error instanceof Error ? error.message : "Unknown error"
      ),
      { status: 500 }
    );
  }
}
