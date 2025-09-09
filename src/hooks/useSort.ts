import { useCallback } from "react";
import { useUrlParams } from "./useUrlParams";

export const useSort = () => {
  const { updateParams, getParam } = useUrlParams();
  
  const currentSort = getParam("sort");
  const [sortBy, sortDir] = currentSort?.split(":") ?? [null, null];

  const handleSort = useCallback((field: string) => {
    const sortedDirection = sortBy === field && sortDir === "asc" ? "desc" : "asc";
    
    updateParams({ sort: `${field}:${sortedDirection}`, page: "1" }, false);
  }, [sortBy, sortDir, updateParams]);

  return { handleSort, sortBy, sortDir };
};
