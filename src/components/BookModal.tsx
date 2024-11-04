import React from "react";
import { Book } from "./CreateUpdateBook";
import BookImg from "../assets/book.png";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

type BookModalProps = {
  bookInfo: Book;
  bookModal: boolean;
  setBookModal: (value: boolean) => void;
};

export const BookModal: React.FC<BookModalProps> = ({
  bookInfo,
  bookModal,
  setBookModal,
}) => {
  return (
    <Dialog
      open={bookModal}
      onClose={() => setBookModal(false)}
      className="relative z-10"
    >
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-6 pt-10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[45rem] sm:px-12">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setBookModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    {bookInfo.title}
                  </DialogTitle>
                  <div className="mt-6 flex items-start">
                    <div className="flex-shrink-0">
                      <img
                        className="h-56 rounded-lg object-cover md:w-44"
                        src={BookImg}
                        alt={bookInfo.title}
                      />
                    </div>
                    <div className="ml-4 mt-4 flex flex-col items-start">
                      <table className="min-w-full ml-4">
                        <tbody>
                          <tr>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                              {" "}
                              Author:
                            </td>
                            <td className="whitespace-nowrap py-2  text-sm text-gray-500">
                              {bookInfo.author}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                              Genre:
                            </td>
                            <td className="whitespace-nowrap py-2  text-sm text-gray-500">
                              {bookInfo.genre}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                              Condition:
                            </td>
                            <td className="whitespace-nowrap py-2  text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                                {bookInfo.condition}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                              Availability:
                            </td>
                            <td className="whitespace-nowrap py-2  text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                                {bookInfo.availabilityStatus}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  onClick={() => setBookModal(false)}
                >
                  Borrow
                </Button>
                <Button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setBookModal(false)}
                >
                  Exchange
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  );
};
