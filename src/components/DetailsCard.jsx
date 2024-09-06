import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsCard = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Product ID: ${id}`); // Add this line
    const fetchData = async () => {
      console.log(`Fetching product details for ID: ${id}`);
      try {
        const response = await fetch(`https://server-zeta-nine-87.vercel.app/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product details:", err);
      }
    };
  
    fetchData();
  }, [id]);
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  const {
    title,
    image,
    description,
    company,
    capsuleInfo,
    price,
    originalPrice,
    discount,
    doses,
    packet,
  } = details;

  return (
    <div className="px-50 py-30 my-30 bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg max-w-6xl mx-auto">
      <main className="lg:flex items-center gap-6">
        {/* Image Section */}
        <div
          className="w-full lg:w-1/2 h-80 bg-cover bg-center rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${
              image ||
              "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            })`,
          }}
        ></div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 p-6 space-y-5">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Company Info */}
          {company && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Manufactured by: {company}
            </p>
          )}

          {/* Capsule Info and Doses */}
          {capsuleInfo && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {capsuleInfo} | {doses} doses per packet
            </p>
          )}

          {/* Price Section */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              ${price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="text-sm text-green-500">{discount}% off</span>
          </div>

          {/* Packet Info */}
          {packet && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Available in: {packet}
            </p>
          )}

          {/* CTA Button */}
          <div className="mt-6">
            <button className="w-full px-5 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DetailsCard;
