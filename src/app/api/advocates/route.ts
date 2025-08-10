import db from "@/db";
import { advocates } from "@/db/schema";
import { createErrorResponse } from "@/utils/getAdvocates";
import { PAGINATION_CONFIG } from "@/utils/constants";

const filterAdvocates = (
  data: any[],
  filters: {
    degree?: string;
    city?: string;
    search?: string;
  }
) => {
  const { degree, city, search } = filters;
  
  const degreeLower = degree?.toLowerCase();
  const cityLower = city?.toLowerCase();
  const searchLower = search?.toLowerCase();
  
  return data.filter(advocate => {
    // Degree filter
    if (degreeLower && !advocate.degree.toLowerCase().includes(degreeLower)) {
      return false;
    }
    
    if (cityLower && !advocate.city.toLowerCase().includes(cityLower)) {
      return false;
    }
    
    if (searchLower) {
      const searchableText = [
        advocate.firstName,
        advocate.lastName,
        advocate.city,
        advocate.degree,
        advocate.yearsOfExperience.toString(),
        advocate.phoneNumber.toString(),
        ...(Array.isArray(advocate.specialties) ? advocate.specialties : [])
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }
    
    return true;
  });
};

const sortAdvocates = (data: any[]) => {
  return data.sort((a, b) => {
    const lastNameCompare = a.lastName.localeCompare(b.lastName);
    return lastNameCompare !== 0 ? lastNameCompare : a.firstName.localeCompare(b.firstName);
  });
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(PAGINATION_CONFIG.MIN_LIMIT, parseInt(searchParams.get("page") || PAGINATION_CONFIG.DEFAULT_PAGE.toString()));
    const limit = Math.min(
      Math.max(PAGINATION_CONFIG.MIN_LIMIT, parseInt(searchParams.get("limit") || PAGINATION_CONFIG.DEFAULT_LIMIT.toString())),
      PAGINATION_CONFIG.MAX_LIMIT
    );
    const degree = searchParams.get("degree") || undefined;
    const city = searchParams.get("city") || undefined;
    const search = searchParams.get("search") || undefined;

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

      const filteredData = filterAdvocates(allData, { degree, city, search });
      
      const sortedData = sortAdvocates(filteredData);

      const totalCount = sortedData.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const data = sortedData.slice(startIndex, endIndex);

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
        PAGINATION_CONFIG.DEFAULT_PAGE,
        PAGINATION_CONFIG.DEFAULT_LIMIT,
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
