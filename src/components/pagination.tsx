"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useProduct } from "@/store/useProduct"

export function PaginationComponent() {
  const { currentPage, totalPages, fetchProducts } = useProduct();

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      fetchProducts(page);
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i);
    } else {
      let start = Math.max(0, currentPage - 2);
      let end = Math.min(totalPages, start + 5);
      
      if (end - start < 5) {
        start = Math.max(0, end - 5);
      }
      
      pages = Array.from({ length: end - start }, (_, i) => start + i);
    }
    return pages;
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}