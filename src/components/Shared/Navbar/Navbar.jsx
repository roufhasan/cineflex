import { Fragment, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../../assets/logo.png";
import Container from "../Container";
import {
  FaBars,
  FaClockRotateLeft,
  FaFireFlameCurved,
  FaHourglass,
  FaMagnifyingGlass,
  FaRegBookmark,
  FaRegUser,
  FaXmark,
} from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { Menu, Transition } from "@headlessui/react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { RiShutDownLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import useWatchlist from "../../../hooks/useWatchlist";
import { ResetPageContext } from "../../../Providers/ResetPageProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { resetCurrentPage } = useContext(ResetPageContext);
  const [watchlist] = useWatchlist();
  const [showSearchField, setShowSearchField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out!");
      })
      .catch((error) => console.log(error.message));
  };

  /* Mobile Sidebar Menu Lists */
  const menuLinks = (
    <>
      <ul className="text-white font-Roboto flex flex-col gap-y-[10px] pt-8 px-8 md:hidden min-h-full overflow-y-scroll">
        {user && (
          <>
            <li className="text-center">
              <img
                src={user.photoURL}
                alt=""
                className="w-9 h-9 object-cover rounded-full mx-auto mb-1"
              />
              <p className="text-xl font-medium">
                {user.displayName?.split(" ")[0]}
              </p>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className="flex items-center gap-2 text-sm"
              >
                <FaRegBookmark />
                Watchlist
                <span className="text-custom-orange font-semibold">
                  {watchlist && watchlist.length > 0 ? watchlist.length : " "}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account/settings"
                className="flex items-center gap-2 text-sm"
              >
                <FaRegUser />
                Account
              </NavLink>
            </li>
          </>
        )}
        <li className="mt-3 font-semibold border-b-2 border-custom-orange">
          Menu
        </li>
        <li>
          <NavLink to="/" className="flex items-center gap-2 text-sm">
            <BsHouseDoor />
            Home
          </NavLink>
        </li>
        <li className="mt-3 font-semibold border-b-2 border-custom-orange">
          Movies
        </li>
        <li>
          <NavLink
            to="/movies/popular"
            className="flex items-center gap-2 text-sm"
          >
            <TbMovie color="#fff" />
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies/top_rated"
            className="flex items-center gap-2 text-sm"
          >
            <FaFireFlameCurved color="#fff" />
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies/now_playing"
            className="flex items-center gap-2 text-sm"
          >
            <FaClockRotateLeft color="#fff" />
            Now Playing
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
        <li className="mt-5 font-semibold border-b-2 border-custom-orange">
          TV Series
        </li>
        <li>
          <NavLink
            to="/tv-shows/popular"
            className="flex items-center gap-2 text-sm"
          >
            <PiTelevisionBold color="#fff" />
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-shows/top_rated"
            className="flex items-center gap-2 text-sm"
          >
            <FaFireFlameCurved color="#fff" />
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-shows/airing_today"
            className="flex items-center gap-2 text-sm"
          >
            <FaClockRotateLeft color="#fff" />
            Airing Today
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-shows/on_the_air"
            className="flex items-center gap-2 text-sm mb-4"
          >
            <FaHourglass color="#fff" />
            Upcoming
          </NavLink>
        </li>
        {user ? (
          <li
            onClick={handleLogOut}
            className="flex items-center justify-center gap-2 bg-[#f98616] rounded mb-4 cursor-pointer"
          >
            Sign Out
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              className="flex items-center justify-center gap-2 bg-[#f98616] rounded mb-4"
            >
              Sign In
            </NavLink>
          </li>
        )}
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

  // Search for movies/shows/people/all
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const query = form.searchValue.value;
    if (query.length === 0) {
      toast.error("Search field can't be empty!!");
      return;
    }
    navigate(`/search/${category.toLowerCase()}/${query.toLowerCase()}`);
    setShowSearchField(false);
  };

  return (
    <Container>
      <div className="relative">
        <nav
          className={`flex items-center justify-between px-[5%] py-[10px] fixed top-0 w-full max-w-[1920px] z-10 ${
            colorChange ? "bg-blue-gray" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <div>
            <Link to="/">
              <img className="w-32 sm:w-40" src={Logo} alt="cineflex logo" />
            </Link>
          </div>

          {/* Mobile Menu Links */}
          <div>
            <ul className="text-white font-Roboto font-medium hidden md:flex gap-x-4 items-end">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {/* Movies Drop-Down Menu */}
              <li>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button>Movies</Menu.Button>
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
                    <Menu.Items className="absolute left-0 mt-2 w-40 divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/movies/popular"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Popular</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Popular"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/movies/top_rated"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Top Rated</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Top Rated"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/movies/now_playing"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Now Playing</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Now Playing"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/movies/upcoming"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Upcoming</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Upcoming"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>

              {/* TV Shows Drop-Down Menu */}
              <li>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">TV Shows</Menu.Button>
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
                    <Menu.Items className="absolute left-0 mt-2 w-40 divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/tv-shows/popular"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Popular</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Popular"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/tv-shows/top_rated"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Top Rated</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Top Rated"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/tv-shows/airing_today"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Airing Today</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Airing Today"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/tv-shows/on_the_air"
                              onClick={resetCurrentPage}
                              className={`${
                                active
                                  ? "bg-custom-orange text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <div className="flex w-full justify-between items-center">
                                  <p>Upcoming</p>
                                  <MdArrowForwardIos size={16} />
                                </div>
                              ) : (
                                "Upcoming"
                              )}
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </ul>
          </div>

          {/* Desktop toggle search filed & sign-in / user-profile dropdown */}
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

            {/* User profile dropdown / sign in */}
            {user ? (
              <Menu
                as="div"
                className="relative text-left hidden md:inline-block"
              >
                <div>
                  <Menu.Button className="flex items-center gap-2">
                    <div>
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="w-9 h-9 object-cover rounded-full"
                        />
                      ) : (
                        <FaCircleUser size={30} />
                      )}
                    </div>
                    <p>
                      {user.displayName
                        ? user.displayName?.split(" ")[0]
                        : "Mr. X"}
                    </p>
                  </Menu.Button>
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
                  <Menu.Items className="absolute right-0 mt-2 w-40 divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/watchlist"
                            className={`${
                              active
                                ? "bg-custom-orange text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <div className="flex w-full justify-between items-center">
                                <p>
                                  Watchlist
                                  <span className="text-sm ml-1">
                                    {watchlist?.length || 0}
                                  </span>
                                </p>
                                <MdArrowForwardIos size={16} />
                              </div>
                            ) : (
                              <p>
                                Watchlist
                                <span className="text-custom-orange text-sm ml-1">
                                  {watchlist?.length || 0}
                                </span>
                              </p>
                            )}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account/settings"
                            onClick={resetCurrentPage}
                            className={`${
                              active
                                ? "bg-custom-orange text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <div className="flex w-full justify-between items-center">
                                <p>Account</p>
                                <MdArrowForwardIos size={16} />
                              </div>
                            ) : (
                              "Account"
                            )}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={handleLogOut}
                            className={`${
                              active
                                ? "bg-custom-orange text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                          >
                            {active ? (
                              <div className="flex w-full justify-between items-center">
                                <p>Sign out</p>
                                <RiShutDownLine size={16} />
                              </div>
                            ) : (
                              "Sign Out"
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="hidden md:block font-medium text-white"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Devices Toggle Menu Icon */}
            <FaBars
              onClick={() => setShowMenu(!showMenu)}
              size={20}
              className="text-white cursor-pointer md:hidden"
            />
          </div>
        </nav>

        {/* Search Field */}
        {showSearchField && (
          <motion.div
            className={`w-full max-w-[1920px] text-black px-[5%] py-4 mx-auto rounded fixed top-12 sm:top-16 z-10 ${
              colorChange ? "bg-blue-gray" : "bg-transparent"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <form
              onSubmit={handleSearch}
              className="flex w-full bg-white items-center justify-between border"
            >
              <select
                name="category"
                id=""
                className="w-[84px] bg-white pl-2 border-none outline-none"
              >
                <option value="movie">Movies</option>
                <option value="tv">Shows</option>
                <option value="person">Person</option>
                <option value="multi">All</option>
              </select>
              <div className="w-full">
                <input
                  type="text"
                  name="searchValue"
                  id=""
                  placeholder="Search for movies, shows, people"
                  className="w-full p-3 md:px-5 outline-none border-l-2"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-block pr-2 md:px-6 text-custom-white font-semibold"
                >
                  <FaMagnifyingGlass className="text-lg text-custom-orange md:text-xl" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Mobile Devices Menu */}
        {showMenu && (
          <motion.div
            onClick={() => setShowMenu(!showMenu)}
            className="fixed right-0 -top-6 bg-black/30 w-screen min-h-full py-6 z-10 flex justify-end overflow-y-scroll md:hidden"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="backdrop-blur h-screen min-h-full w-[55%] overflow-y-scroll">
              {menuLinks}
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;
