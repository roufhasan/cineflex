import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../../assets/newLogo.png";
import Container from "../Container";
import {
  FaBars,
  FaClockRotateLeft,
  FaFireFlameCurved,
  FaHourglass,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import { BsHouseDoor } from "react-icons/bs";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";

const Navbar = () => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [colorChange, setColorchange] = useState(false);

  const menuLinks = (
    <>
      <ul className="text-white font-Roboto flex flex-col gap-y-[10px] pt-12 px-8">
        <li>
          <NavLink to="/" className="flex items-center gap-2 text-sm">
            <BsHouseDoor />
            Home
          </NavLink>
        </li>
        <li className="mt-2 font-semibold">Movies</li>
        <li>
          <NavLink to="/" className="flex items-center gap-2 text-sm">
            <TbMovie color="#fff" />
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="flex items-center gap-2 text-sm">
            <FaFireFlameCurved color="#fff" />
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies/upcoming"
            className="flex items-center gap-2 text-sm"
          >
            <FaHourglass color="#fff" />
            Upcoming
          </NavLink>
        </li>
        <li className="mt-2 font-semibold">TV Series</li>
        <li>
          <NavLink
            to="/movies/upcoming"
            className="flex items-center gap-2 text-sm"
          >
            <PiTelevisionBold color="#fff" />
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies/upcoming"
            className="flex items-center gap-2 text-sm"
          >
            <FaFireFlameCurved color="#fff" />
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies/upcoming"
            className="flex items-center gap-2 text-sm"
          >
            <FaClockRotateLeft color="#fff" />
            Latest
          </NavLink>
        </li>
        <li className="mt-[calc(100vh-420px)]">
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 bg-[#f98616] rounded py-1"
          >
            Sign In
          </NavLink>
        </li>
      </ul>
    </>
  );

  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <Container>
      <div className="relative">
        <nav
          className={`flex items-center justify-between px-[5%] py-[10px] fixed top-0 w-full max-w-[1920px] z-10 ${
            colorChange ? "bg-blue-gray" : "bg-transparent"
          }`}
        >
          <div>
            <Link to="/">
              <img className="w-32 sm:w-40" src={Logo} alt="cineflex logo" />
            </Link>
          </div>
          <div>
            <ul className="text-white font-Roboto font-medium hidden md:flex gap-x-4 items-end">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/movies/popular">Popular</NavLink>
              </li>
              <li>
                <NavLink to="/movies/top_rated">Top Rated</NavLink>
              </li>
              <li>
                <NavLink to="/movies/upcoming">Upcoming</NavLink>
              </li>
            </ul>
          </div>
          <div className="relative flex items-center gap-x-6">
            {showSearchField ? (
              <FaXmark
                onClick={() => setShowSearchField(!showSearchField)}
                size={20}
                className="text-white cursor-pointer"
              />
            ) : (
              <FaMagnifyingGlass
                onClick={() => setShowSearchField(!showSearchField)}
                size={20}
                className="text-white cursor-pointer"
              />
            )}

            <Link
              to="/login"
              className="hidden md:block font-medium text-white"
            >
              Sign In
            </Link>

            <FaBars
              onClick={() => setShowMenu(!showMenu)}
              size={20}
              className="text-white cursor-pointer md:hidden"
            />

            {showSearchField && (
              <motion.div
                className="absolute right-0 top-[210%] text-black bg-orange-400 p-1 rounded z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <form>
                  <div className="flex">
                    <div>
                      <input
                        type="text"
                        name="searchText"
                        placeholder="Search..."
                        className="px-2 p-1 rounded-l outline-none"
                      />
                    </div>
                    <div className=" bg-orange-400 p-2 pt-1">
                      <FaMagnifyingGlass
                        size={20}
                        className="text-white cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </nav>
        {showMenu && (
          <motion.div
            onClick={() => setShowMenu(!showMenu)}
            className="fixed right-0 -top-6 bg-black/30  w-screen h-screen py-6 z-10 flex justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="backdrop-blur h-screen w-[50%]">{menuLinks}</div>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;
