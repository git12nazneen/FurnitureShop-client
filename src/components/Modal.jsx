import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Payment from "./Payment";

// Details Dialog Component
const ProductDetailsDialog = ({ product, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm mx-auto bg-white p-6 rounded shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <img
            src={product.image}
            className="h-full w-full object-cover object-center"
            alt={product.name}
          />

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">{product.title}</a>
                </h3>
                <p className="ml-4">${product.price}</p>
              </div>
          
              <p className="mt-1 text-sm text-gray-500">Discount {product.discount}</p>
            </div>
            
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

// Main Modal Component
const Modal = () => {
  const [open, setOpen] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://server-zeta-nine-87.vercel.app/cards");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

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
  // const resetCart = () => {
  //   setUserCards([]);
  // };

  const handleCheckoutClick = () => {
    if (userCards.length > 0) {
      setIsCheckoutDisabled(true);
      setUserCards([]);
      setIsPaymentOpen(true);
      setSelectedProduct([]);
    }
  };

  const openDetailsDialog = (product) => {
    setSelectedProduct(product);
    setIsDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {userCards.map((product) => (
                            <li
                              key={product._id}
                              className="flex py-6 cursor-pointer"
                            >
                              <button
                                type="button"
                                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                                onClick={() => {
                                  openDetailsDialog(product);
                                }}
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
                                    <h3>
                                      <a href="#">{product.title}</a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                 
                                 
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="mt-1 text-sm text-gray-500">
                                  Discount  {product.discount}
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
                    </div>
                  </div>

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
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-[#0e7673] hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Payment Modal */}
      {isPaymentOpen && (
        <Dialog
          open={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />
          <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-xl">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Payment
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsPaymentOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <Payment
                    onPaymentSelect={(method) =>
                      console.log("Selected payment method:", method)
                    }
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}

      {/* Product Details Dialog */}
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          isOpen={isDetailsDialogOpen}
          onClose={closeDetailsDialog}
        />
      )}
    </>
  );
};

export default Modal;
