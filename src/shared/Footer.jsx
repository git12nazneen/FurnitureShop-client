import React from "react";
import logo from "../assets/logo2.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaMobile } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import nogod from "../assets/nogod.png";
import bkash from "../assets/bkash.png";
import visa from "../assets/visa.png";

const Footer = () => {
  return (
    <div className="mx-auto bg-black">
      <div className=" py-14 mx-9 text-white font-light justify-center grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
        <div className="space-y-3 lg:pr-10">
          <div className="flex items-center ">
            <a href="#">
              <img className="w-32 h-20  " src={logo} alt="" />
            </a>
            <span className="font-bold text-white text-3xl">Medicine</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:pr-10 py-5">
            <div>
              <a href="#">
                <img className="w-32 h-20 " src={logo} alt="" />
              </a>
            </div>
            <div className="space-y-2">
              <h1 className="underline">Trade Licence</h1>
              <h1>TRAD/DNCC/057777/2024</h1>
              <h1>Others License : 180000</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
            <div>
              <h1 className="font-bold text-xl">Company</h1>
              <ul className="space-y-5 font-xl py-5">
                <li>About Us</li>
                <li>Terms and Conditions</li>
                <li>Refund and Return Policy</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold text-xl">Useful Links</h1>
              <ul className="space-y-5 font-xl py-5">
                <li>Account</li>
                <li>Best Selling Products</li>
                <li>Contact Us</li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
           <h1 className="border-b border-b-slate-600 py-5">Play with</h1>
         
           <div className="grid grid-cols-6 gap-2 py-5">
            <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />
             <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />          
            <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />
             <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />           
             <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />
             <img className="w-auto h-8 mr-1 rounded-sm" src={nogod} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={bkash} alt="" />
            <img className="w-auto h-8 mr-1 rounded-sm" src={visa} alt="" />
           </div>
           <h1 className="border-t border-b-slate-600 py-5">Verified by</h1>
           </div>
        </div>
        <div>
          <h1 className="font-bold text-xl pb-2">Contact Info</h1>
          <div className="pr-4 py-3 flex items-center text-center ">
            <span className="text-white pr-2 text-2xl">
              <IoLocationSharp />{" "}
            </span>
            <h1>Address: Sirajganj Sadar, Sirajganj</h1>
          </div>
          <div className="pr-4 py-3 flex items-center text-center ">
            <span className="text-white pr-2 text-2xl">
              <FaPhone />{" "}
            </span>
            <h1>Hot Line : 0962000000</h1>
          </div>
          <div className="pr-4 py-3 flex items-center text-center ">
            <span className="text-white pr-2 text-2xl">
              <FaMobile />{" "}
            </span>
            <h1>Mobile : 01700000000</h1>
          </div>
          <div className="pr-4 py-3 flex items-center text-center ">
            <span className="text-white pr-2 text-2xl">
              <IoMdMail />{" "}
            </span>
            <h1>E-mail : medicine@gmail.com</h1>
          </div>
          <div>
            <ul className="flex ">
              <li className="bg-white text-[#0e7673] p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaFacebookF />
              </li>
              <li className="bg-white text-[#0e7673] p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <CiYoutube />
              </li>
              <li className="bg-white text-[#0e7673] p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaInstagram />
              </li>
              <li className="bg-white text-[#0e7673] p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaLinkedinIn />
              </li>
              <li className="bg-white text-[#0e7673] p-2 rounded-full mr-2 hover:bg-gray-600 hover:text-white">
                <FaXTwitter />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center justify-center py-10 text-white font-light border-t border-white">
        <p>©2021-2024 Poonno.com. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
