import { getDistinctDegrees } from "@/utils/degrees";

export async function GET() {
  try {
    const degrees = await getDistinctDegrees();

    return Response.json({
      data: degrees,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching degrees:", error);

    return Response.json(
      {
        error: "Failed to fetch degrees",
        message: error instanceof Error ? error.message : "Unknown error",
        data: [],
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
