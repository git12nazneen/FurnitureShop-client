import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { LuChevronLeft } from 'react-icons/lu';

const DashSidebar = ({ isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative max-h-screen">
            {/* Button to toggle sidebar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 p-4 text-white bg-sky-800 z-30 md:hidden"
            >
                <MdMenu className={`text-2xl ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sidebar */} 
            <aside
                className={`fixed top-0 left-0 max-h-screen  shadow-xl transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 md:static md:h-full`}
            >
                <div className="p-4 max-h-screen  text-white flex flex-col">
                    <div className="flex items-center justify-between p-4 md:hidden">
                        <span className="text-lg font-semibold">Menu</span>
                        <button onClick={() => setIsOpen(false)} className="text-2xl">
                            <LuChevronLeft />
                        </button>
                    </div>
                    <ul className="flex-1">
                        {isAdmin ? (
                            <>
                                <li className="my-2">
                                    <NavLink
                                        to="/dashboard/addFrom"
                                        className={({ isActive }) =>
                                            `block p-3 rounded-md transition-colors ${
                                                isActive
                                                    ? 'bg-sky-800 font-bold'
                                                    : 'bg-sky-800 hover:bg-gray-400'
                                            }`
                                        }
                                    >
                                        Add Product
                                    </NavLink>
                                </li>
                                <li className="my-2">
                                    <NavLink
                                        to="/dashboard/allUsers"
                                        className={({ isActive }) =>
                                            `block p-3 rounded-md transition-colors ${
                                                isActive
                                                    ? 'bg-sky-800 font-bold'
                                                    : 'bg-sky-800 hover:bg-gray-400'
                                            }`
                                        }
                                    >
                                        All Customers
                                    </NavLink>
                                </li>
                            
                                <li className="my-2">
                                    <NavLink
                                        to="/dashboard/productPage"
                                        className={({ isActive }) =>
                                            `block p-3 rounded-md transition-colors ${
                                                isActive
                                                    ? 'bg-sky-800 font-bold'
                                                    : 'bg-sky-800 hover:bg-gray-400'
                                            }`
                                        }
                                    >
                                        All Products
                                    </NavLink>
                                </li>
                                <li className="my-2">
                                    <NavLink
                                        to="/dashboard/salesAmount"
                                        className={({ isActive }) =>
                                            `block p-3 rounded-md transition-colors ${
                                                isActive
                                                    ? 'bg-sky-800 font-bold'
                                                    : 'bg-sky-800 hover:bg-gray-400'
                                            }`
                                        }
                                    >
                                        Sales Amount
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="my-2">
                                <NavLink
                                    to="/dashboard/profile"
                                    className={({ isActive }) =>
                                        `block p-3 rounded-md transition-colors ${
                                            isActive
                                                ? 'bg-sky-800 font-bold'
                                                : 'bg-sky-800 hover:bg-gray-400'
                                        }`
                                    }
                                >
                                    Participant Profile
                                </NavLink>
                            </li>
                        )}
                        {/* Shared Link */}
                        <li className="my-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block p-3 rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-sky-800 font-bold'
                                            : 'bg-sky-800 hover:bg-gray-400'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default DashSidebar;
