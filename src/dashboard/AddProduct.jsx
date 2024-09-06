// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { TbFidgetSpinner } from "react-icons/tb";

// const AddProduct = ({ handleSubmit, loading, handleDateChange }) => {
//   const [selectedDoses, setSelectedDoses] = React.useState([]);
//   const [startDate, setStartDate] = useState(new Date());

//   const handleChange = (date) => {
//     setStartDate(date);
//     if (handleDateChange) {
//       handleDateChange(date);
//     }
//   };

//   const handleChanges = (selectedOptions) => {
//     setSelectedDoses(selectedOptions);
//   };
//   return (
//     <div className="w-full p-10 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit} className="w-full max-w-4xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             <div className="space-y-1 text-sm">
//               <label htmlFor="name" className="block text-gray-600">
//                 Product Name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="name"
//                 id="name"
//                 type="text"
//                 placeholder="Amoxicillin"
//                 defaultValue="Amoxicillin"
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="company" className="block text-gray-600">
//                 Company
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="company"
//                 id="company"
//                 type="text"
//                 placeholder="Antibiotic Pharma"
//                 defaultValue="Antibiotic Pharma"
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Original Price
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="price"
//                 id="price"
//                 type="number"
//                 placeholder="55.00"
//                 defaultValue="55.00"
//                 required
//               />
//             </div>
//             <div className="space-y-1 text-sm">
//               <label htmlFor="doses" className="block text-gray-600">
//                 Doses
//               </label>
//               <select
//                 isMulti
//                 // options={doses}
//                 // value={selectedDoses}
//                 onChange={handleChanges}
//                 classNamePrefix="select"
//                 placeholder="Select doses..."
//                 name="doses"
//                 id="doses"
//                 className="basic-multi-select w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
//                 defaultValue=""
//                 required
//               >
//                 <option value="" disabled>
//                   Select dose
//                 </option>
//                 <option value="250mg">250mg</option>
//                 <option value="500mg">500mg</option>
//                 <option value="600mg">600mg</option>
//               </select>
//             </div>
//             <div className="space-y-1 text-sm">
//               <label htmlFor="originalPrice" className="block text-gray-600">
//                Packet
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="originalPrice"
//                 id="originalPrice"
//                 type="number"
//                 placeholder="10"
//                 defaultValue="10"
//                 required
//               />
//             </div>
//             <div className="space-y-1">
//               <label htmlFor="date" className="block text-gray-600">
//                 Select Date
//               </label>
//               <DatePicker selected={startDate} onChange={handleChange} />
//               <input
//                 type="hidden"
//                 name="date"
//                 value={
//                   startDate ? `${startDate.toISOString().slice(0, 16)}:00` : ""
//                 }
//               />
//             </div>
           
//           </div>
//           <div className="space-y-6">
//             <div className="space-y-1 text-sm">
//               <label htmlFor="image" className="block text-gray-600">
//                 Image URL
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="image"
//                 id="image"
//                 type="text"
//                 placeholder="Image URL"
//                 defaultValue="amoxicillin.jpg"
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Price
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="price"
//                 id="price"
//                 type="number"
//                 placeholder="50.00"
//                 defaultValue="50.00"
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="discount" className="block text-gray-600">
//                 Discount
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="discount"
//                 id="discount"
//                 type="text"
//                 placeholder="9% OFF"
//                 defaultValue="9% OFF"
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="capsuleInfo" className="block text-gray-600">
//                 Capsule Info
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500 rounded-md "
//                 name="capsuleInfo"
//                 id="capsuleInfo"
//                 type="text"
//                 placeholder="30 Capsules "
//                 defaultValue="30 Capsules "
//                 required
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="description" className="block text-gray-600">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 className="block rounded-md focus:#0e7673-300 w-full h-32 px-4 py-3 text-gray-800 border border-#0e7673-300 focus:outline-#0e7673-500"
//                 name="description"
//                 placeholder="Amoxicillin"
//                 defaultValue="Amoxicillin"
//               ></textarea>
//             </div>
//           </div>
//         </div>

//         <button
//           disabled={loading}
//           type="submit"
//           className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-black"
//         >
//           {loading ? (
//             <TbFidgetSpinner className="animate-spin m-auto" />
//           ) : (
//             "Save & Continue"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from "react-icons/tb";

const AddProduct = ({ handleSubmit, loading, handleDateChange }) => {
  const [selectedDoses, setSelectedDoses] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    if (handleDateChange) {
      handleDateChange(date);
    }
  };

  const handleChanges = (event) => {
    const { options } = event.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedDoses(selected);
  };

  return (
    <div className="w-full p-10 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Product Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Product Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                name="name"
                id="name"
                type="text"
                placeholder="Amoxicillin"
                defaultValue="Amoxicillin"
                required
              />
            </div>

            {/* Company */}
            <div className="space-y-1 text-sm">
              <label htmlFor="company" className="block text-gray-600">
                Company
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                name="company"
                id="company"
                type="text"
                placeholder="Antibiotic Pharma"
                defaultValue="Antibiotic Pharma"
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
                placeholder="55.00"
                defaultValue="55.00"
                required
              />
            </div>

            {/* Doses */}
            <div className="space-y-1 text-sm">
              <label htmlFor="doses" className="block text-gray-600">
                Doses
              </label>
              <select
                multiple
                onChange={handleChanges}
                value={selectedDoses}
                name="doses"
                id="doses"
                className="basic-multi-select w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                required
              >
                <option value="" disabled>Select dose</option>
                <option value="250mg">250mg</option>
                <option value="500mg">500mg</option>
                <option value="600mg">600mg</option>
              </select>
            </div>

            {/* Packet */}
            <div className="space-y-1 text-sm">
              <label htmlFor="packet" className="block text-gray-600">
                Packet
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                name="packet"
                id="packet"
                type="number"
                placeholder="10"
                defaultValue="10"
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

          <div className="space-y-6">
            {/* Image URL */}
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
                defaultValue="amoxicillin.jpg"
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
                placeholder="50.00"
                defaultValue="50.00"
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
                placeholder="9% OFF"
                defaultValue="9% OFF"
                required
              />
            </div>

            {/* Capsule Info */}
            <div className="space-y-1 text-sm">
              <label htmlFor="capsuleInfo" className="block text-gray-600">
                Capsule Info
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                name="capsuleInfo"
                id="capsuleInfo"
                type="text"
                placeholder="30 Capsules"
                defaultValue="30 Capsules"
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
                placeholder="Amoxicillin"
                defaultValue="Amoxicillin"
              ></textarea>
            </div>
          </div>
        </div>

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
      </form>
    </div>
  );
};

export default AddProduct;

