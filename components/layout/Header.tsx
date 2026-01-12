"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors no-underline">
                            <Image src={'/image/Lê hậu.png'} alt="logo" width={'150'} height={'150'}
                            style={{
                                border: 'none',
                                borderRadius: '50%'
                            }}
                            />
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            Trang chủ
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            Giới thiệu
                        </Link>
                        <Link href={'/education'} className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            Học vấn
                        </Link>
                        <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
                            Liên hệ
                        </Link>
                    </nav>

                    <Button
                        className="md:hidden flex items-center px-3 py-2 border rounded-md text-gray-500 border-gray-300 hover:text-gray-900 hover:border-gray-400 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </Button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
                            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                Trang chủ
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                Giới thiệu
                            </Link>
                            <Link href="/education" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                Học vấn
                            </Link>
                            <Link href={'/contact'} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors no-underline">
                                Liên hệ
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}