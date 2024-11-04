import React from "react";
import bgImg from "../assets/background.png";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative flex flex-col min-h-screen"
      >
        {/* Transparent overlay */}
        <div className="absolute inset-0 bg-white opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
