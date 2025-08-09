import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "@/utils/config";

const setup = () => {
  if (!config.databaseUrl) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
      insert: () => ({
        values: () => [],
      }),
    };
  }

  try {
    // for query purposes
    const queryClient = postgres(config.databaseUrl);
    const db = drizzle(queryClient);
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return {
      select: () => ({
        from: () => [],
      }),
      insert: () => ({
        values: () => [],
      }),
    };
  }
};

export default setup();
