import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { SparklesIcon } from "@heroicons/react/outline";

export const searchOptions = [
  { id: 1, name: "Title" },
  { id: 2, name: "Author" },
  { id: 3, name: "Genre" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type SearchProps = {
  searchCriteria: any;
  setSearchCriteria: (searchCriteria: any) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const SearchBar: React.FC<SearchProps> = ({
  searchCriteria,
  setSearchCriteria,
  searchText,
  setSearchText,
  handleSubmit,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row mx-auto items-center pt-2 space-x-3 w-[60rem]"
      >
        <div className="flex-1 bg-gray-100 p-4 w-80 space-x-4 rounded-lg transform hover:scale-105 transition duration-200">
          <div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search bookswap.connect"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex-initial w-64 py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
          <Listbox value={searchCriteria} onChange={setSearchCriteria}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <ListboxButton className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {searchCriteria.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {searchOptions.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {option.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto hover:shadow-lg transition duration-3000 cursor-pointer"
        >
          <SparklesIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Search
        </button>
      </form>
    </>
  );
};
