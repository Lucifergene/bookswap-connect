import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import BrandLogo from "../assets/logo.png";
import { SearchBar, SearchOption, searchOptions } from "./SearchBar";
import { API_SERVER } from "../../const";
import { Option } from "./FilterDropdown";
import { BookSearch } from "./BookSearch.tsx";

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalResults: number;
}

export const Home: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchOption>(
    searchOptions[0],
  );
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
          `${API_SERVER}/api/books/search?${queryParams.toString()}`,
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

  const clearSearch = () => {
    setSubmit(false);
    setSearchText("");
    setSelectedConditions([]);
    setAvailabilityStatus([]);
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
        `${API_SERVER}/api/books/search?${queryParams.toString()}`,
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
    );
  }

  const BreadCrumb = () => (
    <nav className="flex mb-4 ml-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              to="/"
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <div className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              Search
            </div>
          </div>
        </li>
      </ol>
    </nav>
  );

  return (
    <div className="flex flex-row mx-auto items-center my-6 p-6 space-x-3 bg-white rounded-xl shadow-lg w-[70rem]">
      <div className="flex min-h-full flex-1 pt-3 flex-col justify-center px-6 py-12 lg:px-8">
        <BreadCrumb />
        <BookSearch
          books={books}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
          searchText={searchText}
          setSearchText={setSearchText}
          handleSubmit={handleSubmit}
          setSelectedConditions={setSelectedConditions}
          setAvailabilityStatus={setAvailabilityStatus}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
