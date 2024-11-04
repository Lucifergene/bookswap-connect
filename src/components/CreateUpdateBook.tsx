import React, { useState, useEffect } from "react";
import { AlertMessage, AlertMessageProps } from "./AlertMessage";
import { API_SERVER } from "../../const";

type AddBookProps = {
  onClose: (value: boolean) => void;
  onBookAdded: () => void;
  bookToEdit?: Book | null;
  isEditMode?: boolean;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availabilityStatus: string;
};

export const AddBook: React.FC<AddBookProps> = ({
  onClose,
  onBookAdded,
  bookToEdit,
  isEditMode = false,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("Good");
  const [availabilityStatus, setAvailabilityStatus] = useState("Available");
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>();

  useEffect(() => {
    if (isEditMode && bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);
      setCondition(bookToEdit.condition);
      setAvailabilityStatus(bookToEdit.availabilityStatus);
    }
  }, [isEditMode, bookToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage({
        type: "error",
        message: "No token found. Please log in.",
      });
      return;
    }

    try {
      const url = isEditMode
        ? `${API_SERVER}/api/books/${bookToEdit?._id}`
        : `${API_SERVER}/api/books`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          genre,
          condition,
          availabilityStatus,
        }),
      });

      const data = await response.json();

      if (response.status === 201 || response.status === 200) {
        setAlertMessage({
          type: "success",
          message: isEditMode
            ? "Book updated successfully"
            : "Book created successfully",
        });
        onBookAdded(); // Update the book list
        onClose(false); // Close the form
      } else if (response.status === 400) {
        setAlertMessage({
          type: "error",
          message: data.message || "All fields are required",
        });
      } else if (response.status === 401) {
        setAlertMessage({
          type: "error",
          message: "Unauthorized: Invalid or missing token",
        });
      } else if (response.status === 403) {
        setAlertMessage({
          type: "error",
          message: "Forbidden: Access denied",
        });
      } else if (response.status === 500) {
        setAlertMessage({
          type: "error",
          message: "Internal Server Error: Failed to create/update book",
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: `Error creating/updating book: ${error}`,
      });
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white pl-7 pr-9 pb-4 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isEditMode ? "Edit Book" : "Add Book"}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {isEditMode
                ? "Update the details of the book."
                : "Fill in the details of the book you want to add."}
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Author
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="author"
                  id="author"
                  autoComplete="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Genre
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="genre"
                  name="genre"
                  type="text"
                  autoComplete="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Condition
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="condition"
                  name="condition"
                  autoComplete="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="availability_status"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Availability Status
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  name="availability_status"
                  id="availability_status"
                  autoComplete="availability_status"
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>
            </div>
            {alertMessage && <AlertMessage {...alertMessage} />}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => onClose(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
