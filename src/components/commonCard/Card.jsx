import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Card = ({ card }) => {
  const { user } = useAuth();
  const {
    image,
    description,
    price,
    originalPrice,
    discount,
    title,
    _id,
    piece: initialpiece, // Destructure as initialpiece
  } = card;

  const [piece, setpiece] = useState(initialpiece); // Initialize local piece state
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (cardsData) => {
      try {
        const { data } = await axiosSecure.post("/cards", cardsData);
        return data;
      } catch (error) {
        console.error("Error posting card data:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Added Product Successfully!");
      setIsAddedToCart(true);
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });
  const handleAddToCart = async () => {
    if (piece > 0) {
      try {
        // Decrement piece count on the server
        const response = await axiosSecure.patch(`/products/${_id}/decrement`);
        const updatedpiece = response.data.piece; // Get the updated piece count from the server
        setpiece(updatedpiece); // Update local state

        if (updatedpiece > 0) {
          const cardsData = {
            name,
            image,
            description,
            company,
            capsuleInfo,
            price,
            originalPrice,
            discount,
            doses,
            piece: updatedpiece,
            email: user.email,
            userName: user.displayName,
          };

          await mutateAsync(cardsData);
        } else {
          toast.error("Product is now out of stock");
        }
      } catch (error) {
        console.error("Error in handleAddToCart:", error);
        toast.error("Failed to update piece count");
      }
    } else {
      toast.error("No more pieces left");
    }
  };

  return (
    <div className="w-72 overflow-hidden bg-white hover:bg-gray-800 rounded-lg shadow-lg dark:bg-gray-800 group">
      <Link to={`/products/${_id}`}>
        <img
          className="object-cover hover:bg-black hover:opacity-35 object-center w-full h-56"
          src={image}
          alt="avatar"
        />
      </Link>
      <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 px-6 pt-4 pb-2 group-hover:text-white">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-white">
          {title}
        </h1>
      </div>
      <div className="px-6 py-2 group-hover:text-white">
        <div className="flex gap-7 py-3">
          <h2 className="text-sm font-bold group-hover:text-white  ">
            ${price}
          </h2>
          <h2 className="text-sm font-bold text-gray-500 group-hover:text-white line-through">
            ${originalPrice}
          </h2>

          <h2 className="text-sm font-bold group-hover:text-white text-red-600">
            {discount}
          </h2>
        </div>
        <h1 className="text-[#60a87e] mb-4 dark:text-white group-hover:text-white">
          {description.slice(0, 50)}
        </h1>

        <button
          onClick={handleAddToCart}
          className={`text-center py-3 rounded-md mb-2 w-full ${
            piece > 0 ? "bg-black text-white" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={piece === 0}
        >
          {piece > 0
            ? isAddedToCart
              ? "View Cart"
              : "Add to cart"
            : "Stock Out"}
        </button>
      </div>
    </div>
  );
};

export default Card;
