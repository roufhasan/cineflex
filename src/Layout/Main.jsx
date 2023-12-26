import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div className="bg-blue-gray text-custom-white font-Roboto">
      <ScrollRestoration />
      <Toaster position="top-right" />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
