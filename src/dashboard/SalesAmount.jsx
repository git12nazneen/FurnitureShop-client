import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SalesAmount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], error, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
    onError: (error) => {
      console.error('Error fetching payments:', error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  // Calculate total number of pages
  const totalPages = Math.ceil(payments.length / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className="container mx-auto py-5">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Team members
        </h2>
        <span className="px-3 py-1 text-xs text-#0e7673-600 bg-#0e7673-100 rounded-full dark:bg-gray-800 dark:text-#0e7673-400">
          {payments.length} payments
        </span>
      </div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-bold text-[#0e7673]">All Customers</h2>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                  <span>Index</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <span>Name</span>
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <span>Email</span>
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Phone Number
              </th>
              <th scope="col" className="relative py-3.5 px-4">
                <span className="sr-only">Amount</span>
              </th>
              <th scope="col" className="relative py-3.5 px-4">
                <span className="sr-only">Payment Method</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {payments.slice(startIndex, endIndex).map((payment, idx) => (
              <tr key={payment._id}>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    {startIndex + idx + 1}
                  </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <div>
                      <h2 className="font-medium text-gray-800 dark:text-white">
                        {payment.username}
                      </h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {payment.emailAddress}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {payment.address}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {payment.phoneNumber}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {payment.totalAmount}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {payment.paymentMethod}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="text-center py-10">
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
  );
};

export default SalesAmount;
