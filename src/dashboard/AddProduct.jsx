import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from "react-icons/tb";

const AddProduct = ({ handleSubmit, loading, handleDateChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    if (handleDateChange) {
      handleDateChange(date);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="w-full p-10 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              {/* Product Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Product Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Mesh Chair"
                  defaultValue="Mesh Chair"
                  required
                />
              </div>

              {/* Original Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="originalPrice" className="block text-gray-600">
                  Original Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="originalPrice"
                  id="originalPrice"
                  type="number"
                  placeholder="140.00"
                  defaultValue="140.00"
                  required
                />
              </div>

              {/* Category (Dropdown) */}
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600">
                  Category
                </label>
                <select
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  name="category"
                  id="category"
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="rocking">Rocking</option>
                  <option value="lounge">Lounge</option>
                  <option value="side">Side</option>
                </select>
              </div>

              {/* Pieces */}
              <div className="space-y-1 text-sm">
                <label htmlFor="piece" className="block text-gray-600">
                  Pieces
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="piece"
                  id="piece"
                  type="number"
                  placeholder="20"
                  defaultValue="20"
                  required
                />
              </div>

              {/* Select Date */}
              <div className="space-y-1">
                <label htmlFor="date" className="block text-gray-600">
                  Select Date
                </label>
                <DatePicker selected={startDate} onChange={handleChange} />
                <input
                  type="hidden"
                  name="date"
                  value={startDate ? `${startDate.toISOString().slice(0, 16)}:00` : ""}
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-6">
            <div>
              <div className="space-y-1 text-sm">
                <label htmlFor="image" className="block text-gray-600">
                  Image URL
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="image"
                  id="image"
                  type="text"
                  placeholder="Image URL"
                  defaultValue="https://res.cloudinary.com/duid69e8r/image/upload/v1725624049/csyllfubgh3olda6xxfh.png"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="122.50"
                  defaultValue="122.50"
                  required
                />
              </div>

              {/* Discount */}
              <div className="space-y-1 text-sm">
                <label htmlFor="discount" className="block text-gray-600">
                  Discount
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                  name="discount"
                  id="discount"
                  type="text"
                  placeholder="25% OFF"
                  defaultValue="25% OFF"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>
                <textarea
                  id="description"
                  className="block rounded-md focus:outline-[#0e7673] w-full h-32 px-4 py-3 text-gray-800 border border-gray-300"
                  name="description"
                  placeholder="A breathable mesh office chair with adjustable armrests and lumbar support."
                  defaultValue="A breathable mesh office chair with adjustable armrests and lumbar support."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-black"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

