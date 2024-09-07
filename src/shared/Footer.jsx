
import logo from "../assets/F.png";
import { FaFacebookF } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="mx-auto bg-black">
      <div className=" py-14 mx-9 text-white font-light justify-center grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
        <div className="space-y-3 lg:pr-10">
          <div className="flex items-center ">
          <img
              className="bg-sky-500 px-2 py-2 h-10 rounded-full"
              src={logo}
              alt="Logo"
            />
          <h2 className="text-2xl font-bold ml-2">
            Furni<span className="text-sky-500">Flex</span>
          </h2>
          </div>
          
         
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
            <div>
              <h1 className="font-bold text-xl">About us</h1>
              <ul className="space-y-5 font-xl py-5">
                <li className="text-gray-400">Master plan</li>
                <li className="text-gray-400">Job</li>
                <li className="text-gray-400">Invest</li>
                <li className="text-gray-400">Press Room</li>
                <li className="text-gray-400">Blog</li>
                <li className="text-gray-400">Contact room</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold text-xl">Explore EEVE</h1>
              <ul className="space-y-5 font-xl py-5">
                <li className="text-gray-400">Unlock my Robot Power</li>
                <li className="text-gray-400">Starlight</li>
                <li className="text-gray-400">Robot Platform</li>
                <li className="text-gray-400">EEVE Roadmap</li>
              </ul>
            </div>
          </div>
      
        </div>
        <div>
          <h1 className="font-bold text-xl pb-2">Community & Support</h1>
          <ul className="space-y-5 font-xl py-5">
                <li className="text-gray-400">Willow X Community</li>
                <li className="text-gray-400">Developer & Maker Access</li>
                <li className="text-gray-400">Special Classes</li>
               
              </ul>
        </div>
      </div>

      <div className="text-center justify-center py-7 text-white font-light border-t border-white">
      <div className="mx-9 flex flex-col items-center justify-between px-3 py-8 lg:flex-row">
      <div>
            <ul className="flex ">
              <li className=" text-gray-400 p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaFacebookF />
              </li>
              <li className=" text-gray-400 p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <CiYoutube />
              </li>
              <li className=" text-gray-400 p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaInstagram />
              </li>
              <li className=" text-gray-400 p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaLinkedinIn />
              </li>
              <li className=" text-gray-400 p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaXTwitter />
              </li>
            </ul>
          </div>

<div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Overview
    </a>

    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Features
    </a>

    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Pricing
    </a>
    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Careers
    </a>

    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Help
    </a>

    <a href="#" className=" text-gray-400 transition-colors duration-300  hover:text-blue-500">
        Privacy
    </a>
</div>

<p className="mt-6  text-gray-400 lg:mt-0">United States (English). </p>
</div>
        <p className="text-gray-400">EEVE © 2024 All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
