import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCardsData from "../../hooks/userCardsData";

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
    piece: initialpiece,
    name, // Ensure these fields are available
    company,
    capsuleInfo,
    doses,
  } = card;

  const [piece, setpiece] = useState(initialpiece); // Initialize local piece state
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const {refetch} = useCardsData(user)
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (cardsData) => {
      try {
        const { data } = await axiosSecure.post("/cards", cardsData);
        return data;
      } catch (error) {
        console.error("Error posting card data:", error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Added Product Successfully!");
      setIsAddedToCart(true);
      // window.location.reload()
      refetch()
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
            title,
            piece: updatedpiece,
            email: user.email,
            userName: user.displayName,
          };

          await mutateAsync(cardsData);
          refetch();
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
    <div className="w-60 lg:w-72 overflow-hidden bg-white hover:bg-gray-800 rounded-lg shadow-lg  group">
      <Link to={`/products/${_id}`}>
        <img
          className="object-cover hover:bg-black hover:opacity-35 object-center w-full h-56"
          src={image}
          alt="avatar"
        />
      </Link>
      <div className="flex items-center mt-4 text-gray-700  px-6 pt-4 pb-2 group-hover:text-white">
        <h1 className="text-xl font-semibold text-gray-800  group-hover:text-white">
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
        <h1 className="text-gray-600 mb-4  group-hover:text-white">
          {description.slice(0, 50)}
        </h1>

        <button
          onClick={handleAddToCart}
          className={`text-center py-3 rounded-md mb-2 w-full ${
            piece > 0 ? "bg-black text-white group-hover:bg-sky-500 group-hover:text-black" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={piece === 0}
        >
          {piece > 0
            ? isAddedToCart
              ? "Add more you want"
              : "Add to cart"
            : "Stock Out"}
        </button>
      </div>
    </div>
  );
};

export default Card;
