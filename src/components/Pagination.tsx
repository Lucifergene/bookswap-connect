import React from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import { PageInfo } from "./Home";
import { Link } from "react-router-dom";

type PaginationProps = {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  pageInfo,
  onPageChange,
}) => {
  const { currentPage, totalPages } = pageInfo;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Link
          to="#"
          key={i}
          onClick={() => handlePageClick(i)}
          className={`border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
            i === currentPage
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </Link>
      );
    }
    return pageNumbers;
  };

  return (
    <nav className="border-t border-gray-200 px-4 mt-8 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <Link
          to="#"
          onClick={handlePrevious}
          className={`border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium ${
            currentPage === 1
              ? "text-gray-300"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <ArrowNarrowLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <Link
          to="#"
          onClick={handleNext}
          className={`border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-300"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
};
