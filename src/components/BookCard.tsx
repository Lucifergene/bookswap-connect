import React from "react";
import BookImg from "../assets/book.png";
import { Book } from "./CreateUpdateBook";
import { BookModal } from "./BookModal";

type BookCardProps = {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [bookModal, setBookModal] = React.useState<boolean>(false);
  return (
    <>
      <div className="mx-auto flex max-w-xs flex-col min-w-[28rem] items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
        <div className="mb-4 md:mr-6 md:mb-0">
          <img
            className="h-56 rounded-lg object-cover md:w-44"
            src={BookImg}
            alt=""
          />
        </div>
        <div className="">
          <p className="mt-12 text-xl font-medium text-gray-700">
            {book.title}
          </p>
          <p className="mb-4 text-sm font-medium text-gray-500">
            {book.author}
          </p>
          <div className="flex space-x-2">
            <div className=""></div>
          </div>
          <div className="mb-2"></div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto hover:shadow-lg transition duration-3000 cursor-pointer"
              onClick={() => setBookModal(true)}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
      {bookModal && (
        <BookModal
          bookInfo={book}
          setBookModal={setBookModal}
          bookModal={bookModal}
        />
      )}
    </>
  );
};
