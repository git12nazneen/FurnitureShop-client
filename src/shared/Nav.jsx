import react, { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useCard from "../hooks/useCard";
import axios from "axios";
import { AiOutlineShopping } from "react-icons/ai";
import fImg from "../assets/F.png";

const Nav = ({ onSearch }) => {
  const { user, logOut } = useAuth();
  // const [cards] = useCard();
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingModal, setShoppingModal] = useState(false);
  const { sideCollaps, setSideCollaps } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // if user presence img show and clicking toggle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // sidebar open close
  const toggleNavbar = () => {
    setSideCollaps(!sideCollaps);
  };
  // modal opening
  const modalShopping = () => {
    setShoppingModal(!shoppingModal);
  };
  // sign out
  const handleSignOut = () => {
    logOut().then().catch();
    toast.success("Logout successful");
  };
  // data fetching
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://medi-shop-server.vercel.app/cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        toast.error("Failed to fetch cards"); // Optional: Display error to the user
      }
    };

    fetchCards();
  }, []);

  //
  useEffect(() => {
    if (user) {
      const filteredCards = cards.filter(
        (card) =>
          card.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
      );
      setUserCards(filteredCards);
      console.log("Filtered cards length for user:", filteredCards.length);
    }
  }, [cards, user]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow dark:bg-gray-800 ">
      <div className="container px-6 py-3 mx-auto md:flex items-center justify-between">
        <div className="flex items-center">
          <div onClick={toggleNavbar} className=" cursor-pointer">
            <img
              className="bg-sky-500 px-2 py-2 h-10 rounded-full my-3"
              src={fImg}
              alt=""
            />
          </div>

          <h2 className="text-2xl font-bold ">
            Furni<span className="text-sky-500"> Flex</span>
          </h2>
        </div>

        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-center`}
        >
          <div className="relative mt-4 md:mt-0 space-x-10 md:mx-10 md:py-0 flex justify-center items-center">
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Home
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Shop
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              About
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div
              onClick={modalShopping}
              className="rounded-full text-3xl items-center mx-3 cursor-pointer"
            >
              <AiOutlineShopping />
            </div>
            <div className="absolute -bottom-0 -right-0 bg-black rounded-full w-5 h-5 flex items-center justify-center">
              <p className="text-white text-xs">{userCards.length}</p>
            </div>
          </div>

          {/* User Presence and Absence */}
          <div>
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL} // Assuming you have the user photoURL
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={toggleMenu}
                />
                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div
                      onClick={handleSignOut}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold"
                    >
                      Logout
                    </div>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                      onClick={() => setMenuOpen(false)} // Close the menu when clicked
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 py-2 text-white font-xl transition-colors duration-300 transform rounded bg-[#0e7673] hover:bg-red-600 md:mx-2">
                <Link to="/login">Login / SignUp</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {shoppingModal && <Modal />}
    </nav>
  );
};

export default Nav;
