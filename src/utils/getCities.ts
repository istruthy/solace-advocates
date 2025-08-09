import db from "@/db";
import { advocates } from "@/db/schema";

export const getDistinctCities = async () => {
  try {
    if (!db || typeof db.select !== "function") return [];

    const allData = await db.select().from(advocates);
    const locations = allData.map(advocate => advocate.city);
    const uniqueLocations = Array.from(new Set(locations));

    return uniqueLocations.sort();
  } catch (error) {
    console.error("Error in cities:", error);
    return [];
  }
};
