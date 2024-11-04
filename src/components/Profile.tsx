import { useContext } from "react";
import CoverImg from "../assets/cover.png";
import UserImg from "../assets/user.png";
import { Context } from "../App";
import { UserBookList } from "./UserBookList";

export const ProfilePage: React.FC = () => {
  const [user] = useContext(Context);
  return (
    <>
      <div className="flex flex-row mx-auto items-center my-7 p-6 space-x-3 bg-white rounded-xl shadow-lg  w-[60rem]">
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div>
              <div>
                <img
                  className="h-32 w-full object-cover lg:h-48"
                  src={CoverImg}
                  alt=""
                />
              </div>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      src={UserImg}
                      alt=""
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        Bonjour, {user.name}
                      </h1>
                      <p className="text-sm font-medium text-gray-500">
                        Joined on{" "}
                        <time dateTime="2020-08-25">{user.createDate}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={BrandLogo}
              className="mx-auto h-30 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome {user?.name ?? "Guest"}
            </h2>
          </div> */}

            <div className="mt-24">
              <UserBookList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
