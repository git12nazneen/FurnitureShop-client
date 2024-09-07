import { useState } from "react";
import { FaChair } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { PiOfficeChairBold } from "react-icons/pi";

import { RiStickyNote2Line } from "react-icons/ri";


const Sidebar = ({ sideCollaps }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const links = [
    {
      title: "Rocking Chair",
      path: "/",
      icon: <PiOfficeChairBold />,
      
    },
    {
      title: "Side Chair",
      path: "/",
      icon: <FaChair />,
    
    },
    {
      title: "Lounge Chair",
      path: "/",
      icon: <MdChair />,
     
    },
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className={`shadow-xl  h-screen ${sideCollaps ? "w-64" : "w-16"}`}>
      <div className="p-2 bg-white text-black">
        <div
          className={`${
            sideCollaps
              ? "hidden md:flex justify-start items-center gap-2"
              : "hidden"
          }`}
        >
          <div className="rounded-full bg-black p-4 text-center">
            <RiStickyNote2Line className="w-full" />
          </div>
          <h2 className="text-xl font-semibold">Favorite</h2>
        </div>
      </div>
      <nav className="mt-3 bg-sky-200 mx-2">
        <ul>
          {links.map((link, idx) => (
            <li key={idx} className="p-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); 
                  link.subLinks && handleClick(idx); 
                }}
                className={`hover:bg-black hover:text-white active:text-white rounded-lg p-2 flex items-center gap-2`}
              >
                <span
                  className={`text-center ${
                    sideCollaps ? "text-xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {link.icon}
                </span>
                <span
                  className={`font-semibold ${
                    sideCollaps ? "hidden md:block" : "hidden"
                  }`}
                >
                  {link.title}
                </span>
                
              </a>
             
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
