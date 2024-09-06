import React from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar"; // Ensure this import if using Scrollbar
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import Card from "./commonCard/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://medi-shop-server.vercel.app/products");
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
    return <div>Error loading products</div>;
  }

  return (
    <div className="my-10 mx-5 w-auto md:max-w-4xl lg:max-w-5xl">
      <h1 className="font-bold text-2xl">OTC Medicine</h1>
      <div className="relative">
        <ReactSwiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination, Scrollbar]}
          breakpoints={{
            350: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card card={product} />
            </SwiperSlide>
          ))}
        </ReactSwiper>
        {/* Navigation buttons */}
        <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
          <FaAngleLeft />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default Banner;



// import React from "react";
// import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
// import Card from "./commonCard/Card";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";

// const Banner = ({ searchQuery = "" }) => {
//   const {
//     isLoading,
//     error,
//     data: products = [],
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await fetch("https://medi-shop-server.vercel.app/products");
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

//   // Ensure searchQuery is a string
//   const filteredProducts = products.filter((product) =>
//     product.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="my-10 mx-5 w-auto md:max-w-4xl lg:max-w-5xl">
//       <h1 className="font-bold text-2xl">OTC Medicine</h1>
//       <div className="relative">
//         <ReactSwiper
//           spaceBetween={50}
//           slidesPerView={3}
//           navigation={{
//             prevEl: ".swiper-button-prev",
//             nextEl: ".swiper-button-next",
//           }}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay, Navigation, Pagination, Scrollbar]}
//           breakpoints={{
//             350: {
//               slidesPerView: 1,
//             },
//             768: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {filteredProducts.map((product) => (
//             <SwiperSlide key={product.id}>
//               <Card card={product} />
//             </SwiperSlide>
//           ))}
//         </ReactSwiper>
//         <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
//           <FaAngleLeft />
//         </div>
//         <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0e7673] text-white p-2 rounded-full cursor-pointer z-10">
//           <FaAngleRight />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
