import { getDistinctCities } from "@/utils/getCities";

export async function GET() {
  try {
    const cities = await getDistinctCities();
    return Response.json({
      data: cities,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in cities:", error);

    return Response.json(
      {
        data: [],
        success: false,
        timestamp: new Date().toISOString(),
        error: "Failed to fetch cities",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
