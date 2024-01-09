import React, { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
const Navbar = React.lazy(() => import("../components/Shared/Navbar/Navbar"));
const Footer = React.lazy(() => import("../components/Shared/Footer/Footer"));
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div className="bg-blue-gray text-custom-white font-Roboto">
      <ScrollRestoration />
      <Toaster position="top-right" />
      <Suspense fallback={""}>
        <Navbar />
      </Suspense>
      <Outlet />
      <Suspense fallback={""}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Main;
