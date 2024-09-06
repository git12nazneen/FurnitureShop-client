import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdOutlineWidgets } from "react-icons/md";
import { RiStickyNote2Line } from "react-icons/ri";
import { LuChevronLeft } from "react-icons/lu";

const Sidebar = ({ sideCollaps }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const links = [
    {
      title: "Common Condition",
      path: "/",
      icon: <IoMdHome />,
      subLinks: [
        { title: "Condition 1", path: "/sub-item-1" },
        { title: "Condition 2", path: "/sub-item-2" },
      ],
    },
    {
      title: "Blood Pressure and Heart",
      path: "/",
      icon: <MdOutlineWidgets />,
      subLinks: [
        { title: "Blood Pressure", path: "/sub-item-1" },
        { title: "Heart Disease", path: "/sub-item-2" },
      ],
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
          <div className="rounded-full bg-[#ec4f54] p-4 text-center">
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
                <h1 className="-rotate-90">
                  <LuChevronLeft />
                </h1>
              </a>
              {link.subLinks && openIndex === idx && (
                <ul className="pl-6 mt-2 bg-sky-100 rounded-lg">
                  {link.subLinks.map((subLink, subIdx) => (
                    <li key={subIdx} className="p-2">
                      <a
                        href={subLink.path}
                        className={`block hover:bg-black hover:text-white active:text-white rounded-lg p-2 flex items-center gap-2`}
                      >
                        {subLink.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
