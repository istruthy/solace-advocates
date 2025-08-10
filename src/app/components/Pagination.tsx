"use client";

import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  onPageChange?: (_page: number) => void;
  baseUrl?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  limit,
  onPageChange,
}: PaginationProps) => {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * limit + 1, totalCount)} to{" "}
            {Math.min(currentPage * limit, totalCount)} of {totalCount} results
          </div>

          <div className="flex items-center space-x-4">
            {currentPage > 1 && (
              <a
                href={getPageUrl(currentPage - 1)}
                onClick={e => {
                  if (onPageChange) {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-[#285e50]/80 bg-white border border-[#285e50] rounded-md hover:bg-gray-50 transition-colors"
              >
                Previous
              </a>
            )}

            <div className="px-4 py-2 text-sm font-medium bg-[#285e50] hover:bg-[#285e50]/80 text-white rounded-md">
              Page {currentPage} of {totalPages}
            </div>

            {currentPage < totalPages && (
              <a
                href={getPageUrl(currentPage + 1)}
                onClick={e => {
                  if (onPageChange) {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-[#285e50]/80 bg-white border border-[#285e50] rounded-md hover:bg-gray-50 transition-colors"
              >
                Next
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
