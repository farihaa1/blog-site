import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaCross } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";
import { useTheme } from "../Providers/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeProfile = () => setIsProfileOpen(false);

  const handleSignOut = () => {
    logout().then(() => {
      console.log("successfully sign ot");
    });
  };



  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded  ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : `text-gray-700 dark:text-gray-300  ${
                    isScrolled
                      ? " lg:text-gray-800 "
                      : " lg:text-gray-200 "
                  }`
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-blogs"
          className={({ isActive }) =>
            `px-4 py-2 rounded  ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : `text-gray-700 dark:text-gray-300  ${
                    isScrolled
                      ? " lg:text-gray-800 "
                      : " lg:text-gray-200 "
                  }`
            }`
          }
        >
          All blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/featured-blogs"
          className={({ isActive }) =>
            `px-4 py-2 rounded  ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : `text-gray-700 dark:text-gray-300  ${
                    isScrolled
                      ? " lg:text-gray-800 "
                      : " lg:text-gray-200 "
                  }`
            }`
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={`/wishlist/${user?.email}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded  ${
                  isActive
                    ? "bg-btn1 text-white font-semibold"
                    : `text-gray-700 dark:text-gray-300  ${
                        isScrolled
                          ? " lg:text-gray-800 "
                          : " lg:text-gray-200 "
                      }`
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-blog"
              className={({ isActive }) =>
                `px-4 py-2 rounded  ${
                  isActive
                    ? "bg-btn1 text-white font-semibold"
                    : `text-gray-700 dark:text-gray-300  ${
                        isScrolled
                          ? " lg:text-gray-800 "
                          : " lg:text-gray-200 "
                      }`
                }`
              }
            >
              Add Blog
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileDropdown = document.querySelector(".profile-dropdown");
      const profileIcon = document.querySelector(".profile-icon");

      if (
        profileDropdown?.contains(event.target) ||
        profileIcon?.contains(event.target)
      ) {
        return;
      }

      setIsProfileOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <motion.div
      animate={{ y: [-100, 0] }}
      transition={{ duration: 2 }}
      className={`fixed top-0 w-full font-poppins py-2 lg:px-10  transition-all duration-300 z-10 ${
        isScrolled
          ? "bg-white dark:bg-transparent bg-opacity-50 backdrop-blur text-base-content"
          : "bg-base-content"
      }`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start lg:w-[20%]">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`mr-1 px-2 lg:hidden ${
                isScrolled ? "text-black dark:text-white" : "text-white"
              }`}
            >
              <FaBars
                onClick={() => setIsMenuOpen(false)}
                className="w-5 h-5 md:w-7 md:h-7 mr-4"
              />
            </div>
            <ul
              tabIndex={0}
              className=" dropdown-content top-16 bg-base-100 rounded z-[1] mt-3 w-52 shadow space-y-3 pl-4 py-6 dark:bg-base-content"
            >
           
              {Links}
            </ul>
          </div>
          <Link
            to="/"
            className={`text-xl md:text-2xl font-bold font-inter ${
              isScrolled ? "text-black dark:text-white" : "text-white"
            }`}
          >
            Blog Website
          </Link>
        </div>

        <div className="navbar-center justify-center items-center hidden lg:flex w-[60%]">
          <ul className="menu-horizontal px-1 gap-4">{Links}</ul>
        </div>

        <div className="navbar-end lg:w-[20%] flex justify-end items-center gap-4 ">
          <div 
          className={`flex justify-center items-center bg-primary rounded-full ${
            isScrolled ? "text-white dark:text-gray-300" : "text-gray-800 dark:text-gray-300"
          }`}
          >
            <label 
            className="swap swap-rotate rounded-full p-1">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />

              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          {user ? (
            <div>
              <div
                onClick={toggleProfile}
                className="profile-icon rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer flex justify-center items-center"
              >
                {imageError || !user?.photoURL ? (
                  <div className="w-full h-full bg-primary text-white flex justify-center items-center rounded-full">
                    {getInitials(user.displayName)}
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={user?.photoURL}
                    alt={user.displayName}
                    title={user.displayName}
                    onError={handleImageError}
                  />
                )}
              </div>

              {isProfileOpen && (
                <div
                  className={`absolute top-28 w-72 py-4 rounded-lg right-2 bg-white px-6  z-10 shadow-md  transform transition-transform duration-300 ease-in-out ${
                    isProfileOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  <ul className="menu-vertical p-2 space-y-2 py-6 text-base  w-full ">
                    <li
                      onClick={closeProfile}
                      className=" flex justify-end cursor-pointer pb-4 mr-4"
                    >
                      <ImCross />
                    </li>

                    {/* Display user info if available */}
                    <li className="py-1 pl-2">
                      {user?.displayName || "No Name"}
                    </li>
                    <li className="py-1 pl-2">{user?.email || "No Email"}</li>
                    <li className="divider pb-1"></li>

                    <button
                      onClick={handleSignOut}
                      className="bg-primary text-white md:text-lg px-5 py-2 rounded"
                    >
                      Sign Out
                    </button>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-primary text-white px-4 rounded py-2 mr-2"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="bg-primary text-white px-4 rounded py-2"
              >
                Sign
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
