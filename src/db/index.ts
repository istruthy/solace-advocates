import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
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
// suggested by ai review
  try {
    const queryClient = postgres(process.env.DATABASE_URL);
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
