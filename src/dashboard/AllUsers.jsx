import { useQuery } from "@tanstack/react-query";
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";

import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: ` ${user.name} Your are admin now `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (userId) => {
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
        axiosSecure.delete(`/users/${userId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / perPage);

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
      <span className="px-3 py-1 text-xs text-white bg-[#0e7673] rounded-full dark:bg-gray-800 dark:text-[#0e7673]">
        {users.length} users
      </span>
    </div>
    <div className="flex justify-evenly mx-6 my-4">
      <h2 className="text-3xl font-bold text-[#0e7673]">All Customers</h2>
    </div>

    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  className="text-[#0e7673] border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700"
                />
                <span>Index</span>
              </div>
            </th>
            <th className="px-12 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
              <span>Name</span>
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
              <span>Email</span>
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
              Role
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
              Action
            </th>
            <th className="relative py-3.5 px-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {users.slice(startIndex, endIndex).map((user, idx) => (
            <tr key={user._id}>
              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                  {startIndex + idx + 1}
                </div>
              </td>
              <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-x-3">
                  <div>
                    <h2 className="font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </h2>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {user.email}
              </td>
              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <button
                    onClick={() => handleAdmin(user)}
                    className="btn-outline font-extrabold text-blue-600 hover:text-blue-800"
                  >
                    <MdAdminPanelSettings className="text-3xl" />
                  </button>
                )}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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
  );
};

export default AllUsers;
