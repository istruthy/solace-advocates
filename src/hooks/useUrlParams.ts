import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { UI_CONFIG } from "@/utils/constants";

export const useUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>, debounce = true) => {
      if (debounce) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          const params = new URLSearchParams(searchParams);
          
          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
              params.delete(key);
            } else {
              params.set(key, value);
            }
          });

          const url = params.toString() ? `?${params.toString()}` : "";
          router.replace(url, { scroll: false });
        }, UI_CONFIG.DEBOUNCE_DELAY);
      } else {
        const params = new URLSearchParams(searchParams);
        
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "") {
            params.delete(key);
          } else {
            params.set(key, value);
          }
        });

        const url = params.toString() ? `?${params.toString()}` : "";
        router.replace(url, { scroll: false });
      }
    },
    [searchParams, router]
  );

  const clearParams = useCallback((paramKeys: string[]) => {
    const params = new URLSearchParams(searchParams);
    
    paramKeys.forEach(key => {
      params.delete(key);
    });
    
    const url = params.toString() ? `?${params.toString()}` : "";
    router.replace(url, { scroll: false });
  }, [searchParams, router]);

  const getParam = useCallback((key: string) => {
    return searchParams.get(key);
  }, [searchParams]);

  return {
    updateParams,
    clearParams,
    getParam,
    searchParams,
    timeoutRef,
  };
};
