import React, { Fragment, useContext } from "react";
import BrandLogo from "../assets/brand.png";
import UserImg from "../assets/user.png";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  Transition,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Context } from "../App";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Header: React.FC = () => {
  const [user] = useContext(Context);
  const navigate = useNavigate();
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">bookswap.connect</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={BrandLogo}
                alt="bookswap.connect"
              />
            </Link>
          </div>

          {user.id ? (
            <>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <MenuButton className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={UserImg}
                      alt=""
                    />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {user.name}
                    </span>
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="border-t mb-1 border-gray-100" />
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          View Profile
                        </Link>
                      )}
                    </MenuItem>
                    <div className="border-t border-gray-100" />
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to="#"
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                            navigate("/");
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Popover>
  );
};
