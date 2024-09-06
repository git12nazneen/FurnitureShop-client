import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Allorder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page

  const { isLoading, error, data: cards = [] } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("https://medi-shop-server.vercel.app/cards");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cards</div>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(cards.length / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div>
      <section className="container px-4 mx-auto py-5">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            All Orders
          </h2>
          <span className="px-3 py-1 text-xs text-#0e7673-600 bg-#0e7673-100 rounded-full dark:bg-gray-800 dark:text-#0e7673-400">
            {cards.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-#0e7673-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                          {/* SVG icon */}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Price</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Added by
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {cards.slice(startIndex, endIndex).map((product, idx) => (
                      <tr key={product.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            {idx + 1}
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={product.image}
                                alt={product.name}
                              />
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white">
                                  {product.name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                              product.status === "Active"
                                ? "bg-emerald-100/60 dark:bg-gray-800"
                                : "bg-red-100/60 dark:bg-gray-800"
                            }`}
                          >
                            <h2>{product.status}</h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.price}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.company}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">
                              Customer
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                              {/* Edit icon */}
                            </button>
                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                              {/* Delete icon */}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <div className="pagination">
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                              className={`pagination-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                              style={{
                                padding: "8px 12px",
                                margin: "0 4px",
                                border: "1px solid #ccc",
                                backgroundColor:
                                  currentPage === index + 1 ? "#0e7673" : "transparent",
                                color: currentPage === index + 1 ? "#fff" : "#0e7673",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Allorder;
