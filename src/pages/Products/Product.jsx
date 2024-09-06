import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Product = () => {
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [open, setOpen] = useState(true);
  const { user } = useAuth();

  // Fetch data from the server
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://server-zeta-nine-87.vercel.app/cards"
        );
        setCards(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  // Filter user-specific cards and manage checkout button state
  useEffect(() => {
    if (user) {
      const filteredCards = cards.filter(
        (card) =>
          card.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
      );
      setUserCards(filteredCards);
      setIsCheckoutDisabled(filteredCards.length === 0);
    }
  }, [cards, user]);

  // Calculate total values
  const subtotalPrice = userCards.reduce(
    (total, item) => total + (parseFloat(item.price) || 0),
    0
  );

  const totalDiscount = userCards.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const discountPercentage = parseFloat(item.discount) || 0;
    const discountAmount = price * (discountPercentage / 100);
    return total + discountAmount;
  }, 0);

  const totalPrice = subtotalPrice - totalDiscount;

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (userCards.length > 0) {
      setIsCheckoutDisabled(true);
      setUserCards([]);
    }
  };

  // Close button handler
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold my-10">An Overview of your order list</h1>
      <div className="flex flex-col lg:flex-row gap-14">
        {/* Product Section */}
        <div className="w-full lg:w-2/3 mb-10">
          {userCards.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl font-medium text-gray-500">No products added</p>
            </div>
          ) : (
            <div className="flow-root">
              <ul
                role="list"
                className="-my-6 divide-y divide-gray-200 bg-gray-100 border p-10 rounded-lg"
              >
                {userCards.map((product) => (
                  <li
                    key={product._id}
                    className="flex py-6 cursor-pointer"
                  >
                    <button
                      type="button"
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                    >
                      <img
                        src={product.image}
                        className="h-full w-full object-cover object-center"
                        alt={product.name}
                      />
                    </button>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.title}</h3>
                          <p className="ml-4">${product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Price: $ {product.originalPrice}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Discount {product.discount}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="mt-1 text-sm text-gray-500">
                          Qty {product.capsuleInfo}
                        </p>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-[#0e7673] hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Checkout Section */}
        <div className="w-full lg:w-1/3 mb-10">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <div className="mt-4 bg-gray-100 border rounded-lg">
            <div className="border-t space-y-2 border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${subtotalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Discount</p>
                <p>${totalDiscount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCheckoutClick}
                  disabled={isCheckoutDisabled}
                  className={`flex w-full items-center justify-center rounded-md border border-transparent ${
                    isCheckoutDisabled ? "bg-gray-400" : "bg-black"
                  } px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to='/'
                    type="button"
                   
                    className="font-medium text-[#0e7673] hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
