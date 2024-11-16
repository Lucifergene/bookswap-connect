import React from "react";
import { SearchBar, SearchOption } from "./SearchBar.tsx";
import { FilterPanel } from "./FilterPanel.tsx";
import { Book } from "./CreateUpdateBook.tsx";
import { BookCard } from "./BookCard.tsx";
import { Pagination } from "./Pagination.tsx";
import { PageInfo } from "./Home.tsx";
import { Option } from "./FilterDropdown.tsx";

type BookSearchProps = {
  books: Book[];
  searchCriteria: SearchOption;
  setSearchCriteria: (criteria: SearchOption) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setSelectedConditions: (conditions: Option[]) => void;
  setAvailabilityStatus: (status: Option[]) => void;
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
};

export const BookSearch: React.FC<BookSearchProps> = ({
  books,
  searchCriteria,
  setSearchCriteria,
  searchText,
  setSearchText,
  handleSubmit,
  setSelectedConditions,
  setAvailabilityStatus,
  pageInfo,
  onPageChange,
}) => {
  return (
    <>
      <SearchBar
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSubmit={handleSubmit}
      />
      <div className="relative mt-5 mb-10 w-full border-t border-gray-300" />

      <FilterPanel
        setSelectedConditions={setSelectedConditions}
        setAvailabilityStatus={setAvailabilityStatus}
      />

      {books?.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2"
        >
          {books?.map((book: Book) => (
            <>
              <li key={book._id}>
                <div className="w-full flex items-center justify-between px-2 space-x-6">
                  <BookCard key={book._id} book={book} />
                </div>
              </li>
            </>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-2 text-sm text-gray-700">
          No books found. Please try a different search.
        </p>
      )}
      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </>
  );
};
