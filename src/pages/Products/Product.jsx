

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Payment from "../../components/Payment";
import UseAxiosPublic from "../../hooks/UseAxiosPublice";
import Swal from "sweetalert2";
import useCardsData from "../../hooks/userCardsData";
import { XMarkIcon } from "@heroicons/react/24/outline";


const Product = () => {
  const [open, setOpen] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const { userCards, isCheckoutDisabled, subtotalPrice, totalDiscount, totalPrice,  refetch } = useCardsData(user);

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (userCards.length > 0) {
      setIsPaymentOpen(true);
    }
  };

  // Close button handler
  const onClose = () => {
    setOpen(false);
  };

  // Handle delete
  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cards/${productId._id}`)
          .then((res) => {
            console.log("Delete response:", res.data);

            if (res.data.message === 'Product deleted successfully') {
              // window.location.reload();
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-10 lg:px-0">
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
                  <li key={product._id} className="flex py-6 cursor-pointer">
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
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="mt-1 text-sm text-gray-500">Discount {product.discount}</p>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-[#0e7673] hover:text-indigo-500"
                            onClick={() => handleDelete(product)}
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
        <div className="w-full lg:w-1/3 mt-0 lg:-mt-16 mb-10">
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
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Estimated Tax</p>
                <p>$-</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
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
        </div>
      </div>

      {/* Payment Dialog */}
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
    </div>
  );
};

export default Product;