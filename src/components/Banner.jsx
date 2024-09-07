// import { useState } from "react";
// import Card from "./commonCard/Card";
// import { useQuery } from "@tanstack/react-query";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// const Banner = () => {
//   const [currentPage, setCurrentPage] = useState(1); // Initialize state for current page
//   const cardsPerPage = 6; // Number of cards per page

//   const {
//     isLoading,
//     error,
//     data: products,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await fetch(
//         "https://server-zeta-nine-87.vercel.app/products"
//       );
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading products</div>;
//   }

//   // Logic for pagination
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

//   const totalPages = Math.ceil(products.length / cardsPerPage);

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

//   return (
//     <div className="my-10 mx-10 w-auto md:max-w-4xl lg:max-w-5xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {currentCards.map((product) => (
//           <Card key={product.id} card={product} />
//         ))}
//       </div>

//       {/* Pagination controls */}
//       <div className="my-5 pt-10 flex justify-center items-center mt-5 space-x-2">
//         {/* Previous Button */}
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded ${
//             currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
//           }`}
//         >
//           <FaAngleLeft />
//         </button>

//         {/* Page Number Buttons */}
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => handlePageClick(number)}
//             className={`px-4 py-1 rounded ${
//               currentPage === number
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 text-gray-700"
//             }`}
//           >
//             {number}
//           </button>
//         ))}

//         {/* Next Button */}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded ${
//             currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
//           }`}
//         >
//       <FaAngleRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import { useState, useEffect } from "react";
import Card from "./commonCard/Card";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Banner = ({ selectedCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { isLoading, error, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://server-zeta-nine-87.vercel.app/products");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  useEffect(() => {
    if (products) {
      if (selectedCategory) {
        setFilteredProducts(
          products.filter((product) =>
            product.category.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );
      } else {
        setFilteredProducts(products);
      }
    }
  }, [products, selectedCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="my-10 mx-10 w-auto md:max-w-4xl lg:max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentCards.map((product) => (
          <Card key={product.id} card={product} />
        ))}
      </div>

      <div className="my-5 pt-10 flex justify-center items-center mt-5 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
          }`}
        >
          <FaAngleLeft />
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-4 py-1 rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
          }`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
