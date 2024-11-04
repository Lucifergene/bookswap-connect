import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { AddBook, Book } from "./CreateUpdateBook";
import { BookOpenIcon } from "@heroicons/react/solid";
import { DeleteModal } from "./DeleteModal";
import { Spinner } from "./Spinner";
import { API_SERVER } from "../../const";

export const UserBookList: React.FC = () => {
  const [user] = useContext(Context);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [bookAdded, setBookAdded] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState("");
  const [deleteModal, setDeleteModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${API_SERVER}/api/books?user_id=${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            const { success, data } = await response.json();
            if (success) {
              console.log("Fetched books:", data);
              setBooks(data);
            } else {
              setError("Failed to fetch books");
            }
          } else if (response.status === 403) {
            setError("Forbidden: Access to this user's books is not allowed");
          } else if (response.status === 401) {
            setError("Unauthorized: Invalid or missing token");
          } else if (response.status === 500) {
            setError("Internal Server Error: Failed to fetch books");
          }
        } catch (error) {
          setError(`Error fetching user data: ${error}`);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No token found. Please log in.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, bookAdded]);

  const handleBookAdded = () => {
    setBookAdded(!bookAdded);
  };

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setIsEditMode(true);
    setFormOpen(true);
  };

  const handleAddBook = () => {
    setBookToEdit(null);
    setIsEditMode(false);
    setFormOpen(true);
  };

  const handleBookDeleted = async (bookId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    try {
      const response = await fetch(`${API_SERVER}/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const { success } = await response.json();
        if (success) {
          console.log("Deleted book:", bookId);
          setBookAdded(!bookAdded);
        } else {
          setError("Failed to delete book");
        }
      } else if (response.status === 403) {
        setError("Forbidden: Access to this book is not allowed");
      } else if (response.status === 401) {
        setError("Unauthorized: Invalid or missing token");
      } else if (response.status === 500) {
        setError("Internal Server Error: Failed to delete book");
      }
    } catch (error) {
      setError(`Error deleting book: ${error}`);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">My Books</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all books ready for lending or exchange.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={handleAddBook}
            >
              <BookOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Book
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {loading ? (
                <Spinner />
              ) : books?.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Condition
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Availability Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {books?.map((book) => (
                      <tr key={book._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          {book.title}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                          {book.genre}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                          {book.condition}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                          {book.availabilityStatus}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                          <Link
                            to="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEditBook(book)}
                          >
                            Edit<span className="sr-only">, {book._id}</span>
                          </Link>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                          <Link
                            to="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                              setDeleteEntry(book._id);
                              setDeleteModalOpen(true);
                            }}
                          >
                            Delete<span className="sr-only">, {book._id}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center mt-2 text-sm text-gray-700">
                  {error ? error : "No books found. Add a book to get started."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={formOpen} onClose={setFormOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <AddBook
                onClose={setFormOpen}
                onBookAdded={handleBookAdded}
                bookToEdit={bookToEdit}
                isEditMode={isEditMode}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {deleteModal && (
        <DeleteModal
          handleDelete={handleBookDeleted}
          entryId={deleteEntry}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteModal={deleteModal}
        />
      )}
    </>
  );
};
