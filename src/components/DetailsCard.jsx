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
    <div className="px-6 py-6 my-6 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
    <main className="lg:grid lg:grid-cols-2 lg:gap-8">
      {/* Image Section */}
      <div
        className="w-full h-[250px] lg:h-[500px] bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url(${
            image ||
            "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          })`,
        }}
      ></div>
  
      {/* Product Info Section */}
      <div className="w-full p-6 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
  
        <p className="text-lg text-gray-800 dark:text-gray-200">
          {description}
        </p>
  
        {/* Company Info */}
        {company && (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Manufactured by: <span className="font-semibold">{company}</span>
          </p>
        )}
  
        {/* Capsule Info and Doses */}
        {capsuleInfo && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{capsuleInfo}</span> | {doses} doses per packet
          </p>
        )}
  
        {/* Price Section */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discount}% off
              </span>
            </>
          )}
        </div>
  
        {/* Packet Info */}
        {packet && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Available in: <span className="font-medium">{packet}</span>
          </p>
        )}
  
        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Special Features
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            <li>Made from eco-friendly materials</li>
            <li>Durable and long-lasting</li>
            <li>Easy to clean and maintain</li>
            <li>Available in various colors and sizes</li>
          </ul>
        </div>
  
        {/* Customer Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Customer Reviews
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            "This product exceeded my expectations in both quality and design. Highly recommend!"
          </p>
        </div>
      </div>
    </main>
  </div>
  
  
  


  );
};
export default DetailsCard;
