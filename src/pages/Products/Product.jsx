
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Payment from "../../components/Payment";
import UseAxiosPublic from "../../hooks/UseAxiosPublice";
import Swal from "sweetalert2";

const Product = () => {
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [open, setOpen] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();

  // Fetch data from the server
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://server-zeta-nine-87.vercel.app/cards");
        setCards(response.data);
        console.log("Fetched cards:", response.data);
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
        (card) => card.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
      );
      setUserCards(filteredCards);
      setIsCheckoutDisabled(filteredCards.length === 0);
    }
  }, [cards, user]);
  console.log("User Cards:", userCards);
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
      setIsPaymentOpen(true);
    }
  };

  // Close button handler
  const onClose = () => {
    setOpen(false);
  };

  // Handle delete
  const [dummyState, setDummyState] = useState(0);

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
            console.log("Delete response:", res.data); // Log the response
  
            if (res.data.message === 'Product deleted successfully') {
             
              window.location.reload()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              window.location.reload()
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
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="mt-1 text-sm text-gray-500">
                          Discount {product.discount}
                        </p>
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
        <div className="w-full lg:w-1/3 -mt-16 mb-10">
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
                <p>Estimated Tex</p>
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
        <DialogBackdrop
          onClick={() => setIsPaymentOpen(false)}
          className="fixed inset-0 bg-gray-500/75"
        />
        <DialogPanel className="relative w-full max-w-md p-6 mx-auto bg-white rounded">
          <DialogTitle
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Payment
          </DialogTitle>
          <div className="mt-2">
            <Payment
              userCards={userCards}
              onClose={() => setIsPaymentOpen(false)}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Product;
