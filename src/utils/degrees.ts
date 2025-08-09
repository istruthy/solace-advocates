import db from "@/db";
import { advocates } from "@/db/schema";

export async function getDistinctDegrees(): Promise<string[]> {
  try {
    if (!db || typeof db.select !== "function") return [];

    const allData = await db.select().from(advocates);
    const degrees = allData.map(advocate => advocate.degree);
    const uniqueDegrees = Array.from(new Set(degrees));

    return uniqueDegrees.sort();
  } catch (error) {
    console.error("Error fetching degrees:", error);
    return [];
  }
}
