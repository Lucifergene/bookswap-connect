import React, { useEffect, useState } from "react";
import BrandLogo from "../assets/logo.png";
import { SearchBar, searchOptions } from "./SearchBar";
import { Pagination } from "./Pagination";
import { BookCard } from "./BookCard";
import { API_SERVER } from "../../const";
import { FilterPanel } from "./FilterPanel";
import { Option } from "./FilterDropdown";
import { Book } from "./CreateUpdateBook";

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalResults: number;
}

export const Home: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState(searchOptions[0]);
  const [selectedConditions, setSelectedConditions] = useState<Option[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<Option[]>([]);
  const [searchText, setSearchText] = useState("");
  const [submit, setSubmit] = React.useState(false);
  const [books, setBooks] = React.useState([]);

  const [pageInfo, setPageInfo] = React.useState<PageInfo>({} as PageInfo);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const queryParams = new URLSearchParams();

      if (searchCriteria.name.toLowerCase() === "title") {
        queryParams.append("title", searchText);
      } else if (searchCriteria.name.toLowerCase() === "author") {
        queryParams.append("author", searchText);
      } else if (searchCriteria.name.toLowerCase() === "genre") {
        queryParams.append("genre", searchText);
      }

      if (selectedConditions.length > 0) {
        selectedConditions.forEach((option) => {
          queryParams.append("condition", option.name);
        });
      }

      if (availabilityStatus.length > 0) {
        availabilityStatus.forEach((option) => {
          queryParams.append("availabilityStatus", option.name);
        });
      }

      try {
        const response = await fetch(
          `${API_SERVER}/api/books/search?${queryParams.toString()}`
        );
        const {
          data: { books, pageInfo },
        } = await response.json();
        console.log(books, pageInfo);
        setPageInfo(pageInfo);
        setBooks(books);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };
    fetchFilteredData();
  }, [selectedConditions, availabilityStatus]);

  const onPageChange = (page: number) => {
    const queryParams = new URLSearchParams();
    if (searchCriteria.name.toLowerCase() === "title") {
      queryParams.append("title", searchText);
    } else if (searchCriteria.name.toLowerCase() === "author") {
      queryParams.append("author", searchText);
    } else if (searchCriteria.name.toLowerCase() === "genre") {
      queryParams.append("genre", searchText);
    }
    queryParams.append("page", page.toString());

    fetch(`${API_SERVER}/api/books/search?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        const {
          data: { books, pageInfo },
        } = data;
        setPageInfo(pageInfo);
        setBooks(books);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (searchCriteria.name.toLowerCase() === "title") {
      queryParams.append("title", searchText);
    } else if (searchCriteria.name.toLowerCase() === "author") {
      queryParams.append("author", searchText);
    } else if (searchCriteria.name.toLowerCase() === "genre") {
      queryParams.append("genre", searchText);
    }

    try {
      const response = await fetch(
        `${API_SERVER}/api/books/search?${queryParams.toString()}`
      );
      const {
        data: { books, pageInfo },
      } = await response.json();
      console.log(books, pageInfo);
      setPageInfo(pageInfo);
      setBooks(books);
      setSubmit(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  if (!submit) {
    return (
      <>
        <div className="flex min-h-full flex-1 pt-48 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
            <img
              alt="bookswap.connect"
              src={BrandLogo}
              className="mx-auto h-30 w-auto"
            />
          </div>
          <div className="flex flex-row mx-auto items-center p-6 space-x-3 bg-white rounded-xl shadow-lg w-[60rem]">
            <SearchBar
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
              searchText={searchText}
              setSearchText={setSearchText}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-row mx-auto items-center my-6 p-6 space-x-3 bg-white rounded-xl shadow-lg w-[70rem]">
      <div className="flex min-h-full flex-1 pt-3 flex-col justify-center px-6 py-12 lg:px-8">
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

        {books.length > 0 ? (
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
      </div>
    </div>
  );
};
