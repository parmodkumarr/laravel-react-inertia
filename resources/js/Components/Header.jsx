import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Header = ({ onMenuClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <Link href="/" className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-800">Your App Name</h1>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    {/* <nav className="hidden lg:flex lg:items-center lg:space-x-8">
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/profile"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                        >
                            Profile
                        </Link>
                    </nav> */}

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-sm focus:outline-none"
                        >
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={`https://ui-avatars.com/api/?name=${auth.user.name}`}
                                alt={auth.user.name}
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
