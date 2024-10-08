import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AiOutlineShopping } from "react-icons/ai";
import fImg from "../assets/F.png";
import userImg from "../assets/pngwing.com.png";
import useCardsData from "../hooks/userCardsData";

const Nav = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingModal, setShoppingModal] = useState(false);
  const { sideCollaps, setSideCollaps } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const { userCards } = useCardsData(user);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNavbar = () => {
    setSideCollaps(!sideCollaps);
  };

  const modalShopping = () => {
    setShoppingModal(!shoppingModal);
  };

  const handleSignOut = () => {
    logOut().then().catch();
    toast.success("Logout successful");
  };
  // Determine if the current path matches a link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow ">
      <div className="container px-6 py-3 mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <div onClick={toggleNavbar} className="cursor-pointer">
            <img
              className="bg-sky-500 px-2 py-2 h-10 rounded-full"
              src={fImg}
              alt="Logo"
            />
          </div>

          <h2 className="text-2xl font-bold ml-2">
            Furni<span className="text-sky-500">Flex</span>
          </h2>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Nav Links - Toggle for Small Screens */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute inset-x-0 top-16 bg-white shadow-lg md:hidden transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-y-0" : "translate-y-[-100%]"
          }`}
        >
          <div className="relative mt-4 space-y-4 px-6 py-4">
            <Link
              to="/"
              className={`block transition-colors duration-300 transform ${
                isActive("/") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/product"
              className={`block transition-colors duration-300 transform ${
                isActive("/product") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Products
            </Link>
            <a
              className={`block transition-colors duration-300 transform ${
                isActive("/category") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
              }`}
              href="#contact"
            >
              Category
            </a>
            <a
              className={`block transition-colors duration-300 transform ${
                isActive("/customer") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
              }`}
              href="#about"
            >
              Customer
            </a>
            <a
              className={`block transition-colors duration-300 transform ${
                isActive("/blog") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
              }`}
              href="#about"
            >
              Blog
            </a>
            {/* Login/SignUp in Mobile View */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL ? user.photoURL : userImg}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={toggleMenu}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div
                      onClick={handleSignOut}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-2 lg:px-4 py-1 lg:py-2 text-white font-xl bg-black rounded hover:bg-red-600">
                <Link to="/login">Login / SignUp</Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop View Nav Links */}
        <div className="hidden md:flex py-2 space-x-10 px-6 items-center">
          <Link
            to="/"
            className={`block transition-colors duration-300 transform ${
              isActive("/") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`block transition-colors duration-300 transform ${
              isActive("/product") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Products
          </Link>
          <a
            className={`block transition-colors duration-300 transform ${
              isActive("/category") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
            }`}
            href="#contact"
          >
            Category
          </a>
          <a
            className={`block transition-colors duration-300 transform ${
              isActive("/customer") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
            }`}
            href="#about"
          >
            Customer
          </a>
          <a
            className={`block transition-colors duration-300 transform ${
              isActive("/blog") ? "bg-gray-200 px-4 py-2 rounded-md" : "text-gray-700 hover:text-blue-500"
            }`}
            href="#about"
          >
            Blog
          </a>
        </div>

        {/* Cart and User Section */}
        <div className="flex items-center gap-2">
          {/* Shopping Cart */}
          <div className="relative">
            <button
              onClick={modalShopping}
              className="rounded-full text-3xl mx-3"
            >
              <AiOutlineShopping />
            </button>
            <div className="absolute -bottom-0 -right-0 bg-black rounded-full w-5 h-5 flex items-center justify-center z-20">
              <p className="text-white text-xs">{userCards.length}</p>
            </div>
          </div>

          {/* User Presence */}
          {user ? (
            <div className="relative hidden md:block">
              <img
                src={user.photoURL ? user.photoURL : userImg}
                alt="User"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={toggleMenu}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </div>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="px-2 lg:px-4 py-1 lg:py-2 text-white font-xl bg-black rounded hover:bg-red-600">
              <Link to="/login">Login / SignUp</Link>
            </div>
          )}
        </div>
      </div>

      {/* Modal Shopping */}
      {shoppingModal && <Modal setShoppingModal={setShoppingModal} />}
    </nav>
  );
};

export default Nav;
