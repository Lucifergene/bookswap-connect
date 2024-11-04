import { Fragment, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

export interface Option {
  id: number;
  name: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface FilterDropdownProps {
  options: Option[];
  label: string;
  onSelectionChange: (selected: Option[]) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options = [],
  label,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelect = (option: Option) => {
    const isSelected = selected.some((item) => item.id === option.id);
    const newSelection = isSelected
      ? selected.filter((item) => item.id !== option.id)
      : [...selected, option];

    setSelected(newSelection);
    onSelectionChange(newSelection);
  };

  const handleDelete = (option: Option) => {
    const newSelection = selected.filter((item) => item.id !== option.id);
    setSelected(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className="w-64 mb-10">
      <Listbox value={selected} onChange={() => {}}>
        {({ open }) => (
          <>
            <ListboxButton className="relative w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <div className="flex flex-wrap gap-1">
                {/* Display badges for selected items or the label if none are selected */}
                {selected.length > 0 ? (
                  selected.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {item.name}
                      <button
                        type="button"
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                        onClick={() => handleDelete(item)}
                      >
                        <span className="sr-only">Delete Filter</span>
                        <svg
                          className="h-2 w-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 8 8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M1 1l6 6m0-6L1 7"
                          />
                        </svg>
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="block truncate text-sm text-gray-500">
                    {label}
                  </span>
                )}
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-700"
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
              <ListboxOptions className="absolute z-10 mt-2 w-64 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <ListboxOption
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-indigo-100 text-indigo-900"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-10 pr-4"
                      )
                    }
                    value={option}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selected.some((item) => item.id === option.id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span
                        className={classNames(
                          selected.some((item) => item.id === option.id)
                            ? "font-semibold"
                            : "font-normal",
                          "ml-3 block truncate"
                        )}
                      >
                        {option.name}
                      </span>
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};
