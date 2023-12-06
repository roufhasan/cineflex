import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="bg-black text-white font-Roboto">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
