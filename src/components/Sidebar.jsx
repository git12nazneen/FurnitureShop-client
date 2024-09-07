import { useState } from "react";
import { FaChair } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { PiOfficeChairBold } from "react-icons/pi";
import { RiStickyNote2Line } from "react-icons/ri";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Sidebar component with collapsible feature and category filtering using tabs
const Sidebar = ({ sideCollaps, setCategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // List of links and their icons
  const links = [
    { title: "Rocking Chair", icon: <PiOfficeChairBold /> },
    { title: "Side Chair", icon: <FaChair /> },
    { title: "Lounge Chair", icon: <MdChair /> },
  ];

  // Handle tab selection
  const handleTabSelect = (index) => {
    const categories = ["Rocking", "Side", "Lounge"];
    setCategory(categories[index]);
  };

  // Handle sidebar item click
  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className={`shadow-xl  ${sideCollaps ? "w-40 lg:w-64" : "w-12 lg:w-16"}`}>
      <div className="p-2 bg-white max-h-screen text-black">
        <div
          className={`${
            sideCollaps
              ? "hidden md:flex justify-start items-center gap-2"
              : "hidden"
          }`}
        >
          <div className="rounded-full bg-black p-4 text-center">
            <RiStickyNote2Line className="w-full text-white" />
          </div>
          <h2 className="text-xl font-semibold">Favorite</h2>
        </div>
      </div>
      <Tabs onSelect={handleTabSelect} >
        <TabList className="flex flex-col p-2 lg:p-4 overflow-y-auto">
          {links.map((link, idx) => (
            <Tab
              key={idx}
              className="flex items-center gap-2 p-2 cursor-pointer"
              onClick={() => handleClick(idx)}
            >
              {link.icon}
              <span className={`font-light lg:font-semibold ${sideCollaps ? "block" : "hidden md:block"}`}>
                {link.title}
              </span>
            </Tab>
          ))}
        </TabList>
      </Tabs>
    
    </aside>
  );
};

export default Sidebar;
