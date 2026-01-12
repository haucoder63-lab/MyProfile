"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        setIsSearchOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors no-underline">
                            <Image src={'/image/Logo.png'} alt="logo" width={'150'} height={'150'}
                            style={{
                                border: 'none',
                                borderRadius: '50%'
                            }}
                            />
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            TRANG CHỦ
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            GIỚI THIỆU
                        </Link>
                        <Link href="/education" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                           HỌC VẤN
                        </Link>
                        <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            LIÊN HỆ
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4 relative">
                        <Button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 bg-transparent text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <FaSearch size={18} />
                        </Button>
                        
                        {isSearchOpen && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <form onSubmit={handleSearch} className="p-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            autoFocus
                                        />
                                        <Button
                                            type="submit"
                                            className="absolute bg-transparent right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            <FaSearch size={16} />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden bg-transparent p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <FaSearch size={18} />
                        </Button>
                        
                        <Button
                            className="md:hidden bg-transparent flex items-center px-3 py-2 border rounded-md text-gray-500 border-none hover:text-gray-900 hover:border-gray-400 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </Button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
                            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                TRANG CHỦ
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                GIỚI THIỆU
                            </Link>
                            <Link href="/education" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                HỌC VẤN
                            </Link>
                            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                LIÊN HỆ
                            </Link>
                        </div>
                    </div>
                )}

                {isSearchOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="p-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    className="absolute bg-transparent right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    <FaSearch size={16} />
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}