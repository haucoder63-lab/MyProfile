"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FaSearch, FaUser, FaSignOutAlt, FaUserShield, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            
            if (response.ok && data.results.total > 0) {
                toast.success(`${data.message}`);
                
                const results = data.results;
                
                if (results.users.length > 0) {
                    if (window.location.pathname !== '/') {
                        router.push('/');
                        setTimeout(() => {
                            const element = document.getElementById('profile');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 500);
                    } else {
                        const element = document.getElementById('profile');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                } else if (results.projects.length > 0) {
                    if (window.location.pathname !== '/') {
                        router.push('/');
                        setTimeout(() => {
                            const element = document.getElementById('projects');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 500);
                    } else {
                        const element = document.getElementById('projects');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                } else if (results.skills.length > 0) {
                    if (window.location.pathname !== '/') {
                        router.push('/');
                        setTimeout(() => {
                            const element = document.getElementById('skills');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 500);
                    } else {
                        const element = document.getElementById('skills');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                } else if (results.education.length > 0) {
                    router.push('/education');
                } else if (results.about.length > 0) {
                    router.push('/about');
                } else if (results.contact.length > 0) {
                    router.push('/contact');
                }
            } else {
                toast.error(data.error || 'Không tìm thấy kết quả nào');
            }
        } catch (error) {
            toast.error('Lỗi kết nối');
        }
        
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleLogout = async () => {
        try {
            logout();
            toast.success('Đăng xuất thành công!');
            setIsUserMenuOpen(false);
            router.push('/');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }
    };

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link 
                            href="/" 
                            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <div className="relative w-16 h-16 overflow-hidden">
                                <Image 
                                    src="/image/Logo.png" 
                                    alt="Logo" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <h1 
                                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '25px',
                                        fontWeight: '700',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Lê Hậu
                                </h1>
                            </div>
                        </Link>
                    </div>
                    
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Trang Chủ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/about" 
                            className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Giới Thiệu
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/education" 
                            className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Học Vấn
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/contact" 
                            className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            Liên Hệ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <Button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2.5 bg-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
                        >
                            <FaSearch size={18} />
                        </Button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user?.fullname?.charAt(7).toUpperCase()}
                                    </div>
                                    <span 
                                        className="hidden md:block text-sm font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '15px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {user?.fullname}
                                    </span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {user?.fullname?.charAt(7).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p 
                                                        className="font-semibold text-gray-900"
                                                        style={{
                                                            fontFamily: 'Roboto',
                                                            fontSize: '16px',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        {user?.fullname}
                                                    </p>
                                                    <p 
                                                        className="text-gray-500 text-sm"
                                                        style={{
                                                            fontFamily: 'Roboto',
                                                            fontSize: '14px',
                                                            fontWeight: '400'
                                                        }}
                                                    >
                                                        {user?.email}
                                                    </p>
                                                    <span 
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                                            user?.role === 'admin' 
                                                                ? 'bg-red-100 text-red-700' 
                                                                : 'bg-green-100 text-green-700'
                                                        }`}
                                                        style={{
                                                            fontFamily: 'Roboto',
                                                            fontSize: '12px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300"
                                                style={{
                                                    textDecoration: 'none',
                                                    fontFamily: 'Roboto',
                                                    fontSize: '15px',
                                                    fontWeight: '500'
                                                }}
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FaUser className="mr-3 text-blue-500" size={16} />
                                                Hồ sơ cá nhân
                                            </Link>
                                            {user?.role === 'admin' && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-300"
                                                    style={{
                                                        textDecoration: 'none',
                                                        fontFamily: 'Roboto',
                                                        fontSize: '15px',
                                                        fontWeight: '500'
                                                    }}
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FaCog className="mr-3 text-purple-500" size={16} />
                                                    Trang quản trị
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '15px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <FaSignOutAlt className="mr-3 text-red-500" size={16} />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}
                            >
                                <FaUser size={16} />
                                <span className="hidden sm:block">Đăng nhập</span>
                            </Link>
                        )}
                        
                        <button
                            className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>

                {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg z-40">
                        <div className="max-w-screen-2xl mx-auto px-6 py-4">
                            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px'
                                    }}
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    className="absolute bg-transparent right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                                >
                                    <FaSearch size={16} />
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg z-40">
                        <div className="px-6 py-4 space-y-2">
                            <Link 
                                href="/" 
                                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trang Chủ
                            </Link>
                            <Link 
                                href="/about" 
                                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Giới Thiệu
                            </Link>
                            <Link 
                                href="/education" 
                                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Học Vấn
                            </Link>
                            <Link 
                                href="/contact" 
                                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Liên Hệ
                            </Link>
                            
                            {isAuthenticated ? (
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex items-center space-x-3 px-4 py-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {user?.fullname?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p 
                                                className="font-semibold text-gray-900"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '15px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {user?.fullname}
                                            </p>
                                            <p 
                                                className="text-gray-500 text-sm"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '13px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Link 
                                        href="/profile" 
                                        className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                                        style={{
                                            textDecoration: 'none',
                                            fontFamily: 'Roboto',
                                            fontSize: '15px',
                                            fontWeight: '500'
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Hồ sơ cá nhân
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link 
                                            href="/admin" 
                                            className="block px-4 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                                            style={{
                                                textDecoration: 'none',
                                                fontFamily: 'Roboto',
                                                fontSize: '15px',
                                                fontWeight: '500'
                                            }}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Trang quản trị
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '15px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <Link 
                                        href="/login" 
                                        className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                                        style={{
                                            textDecoration: 'none',
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontWeight: '500'
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Đăng nhập
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}