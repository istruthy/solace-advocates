export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  ENDPOINTS: {
    ADVOCATES: "/api/advocates",
    DEGREES: "/api/degrees",
  },
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  SCROLL_THRESHOLD: 100,
} as const;
