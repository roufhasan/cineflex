import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Container from "../Container";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuLinks = (
    <>
      <ul className="text-white font-Roboto font-medium flex flex-col gap-y-4 items-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Popular</NavLink>
        </li>
        <li>
          <NavLink to="/">Top Rated</NavLink>
        </li>
        <li>
          <NavLink to="/">Upcoming</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
      </ul>
    </>
  );

  return (
    <Container px="5%">
      <nav className="flex items-center justify-between relative">
        <div>
          <Link to="/">
            <img className="w-32 sm:w-40" src={Logo} alt="cineflex logo" />
          </Link>
        </div>
        <div>
          <ul className="text-white font-Roboto font-medium hidden md:flex gap-x-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Popular</NavLink>
            </li>
            <li>
              <NavLink to="/">Top Rated</NavLink>
            </li>
            <li>
              <NavLink to="/">Upcoming</NavLink>
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

          <Link to="/login" className="hidden md:block font-medium text-white">
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
        {showMenu && (
          <motion.div
            className="absolute right-0 top-full w-full py-6 bg-[#1f1f1f] z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {menuLinks}
          </motion.div>
        )}
      </nav>
    </Container>
  );
};

export default Navbar;
