"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaSearch, FaUser, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        setIsSearchOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Đăng xuất thành công!');
            setIsUserMenuOpen(false);
            router.push('/');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }
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
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors bg-transparent"
                        >
                            <FaSearch size={18} />
                        </Button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    {user?.role === 'admin' ? (
                                        <FaUserShield size={18} />
                                    ) : (
                                        <FaUser size={18} />
                                    )}
                                    <span className="text-sm font-medium">{user?.fullname}</span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user?.fullname}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                                                user?.role === 'admin' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FaUser className="mr-2" size={14} />
                                                Hồ sơ cá nhân
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            >
                                                <FaSignOutAlt className="mr-2" size={14} />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors bg-transparent"
                            >
                                <FaUser size={16} color="black" />
                            </Link>
                        )}
                        
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
                                            className="bg-transparent absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
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
                            className="bg-transparent md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                            
                            {isAuthenticated ? (
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-medium text-gray-900">{user?.fullname}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <Link href="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                        Hồ sơ cá nhân
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <Link href="/login" className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors no-underline">
                                        Đăng nhập
                                    </Link>
                                </div>
                            )}
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
                                            className="bg-transparent absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
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