"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    FaTachometerAlt, 
    FaUsers, 
    FaProjectDiagram,
    FaTools,
    FaGraduationCap,
    FaInfoCircle,
    FaEnvelope,
    FaChartLine, 
    FaCog,
    FaTimes
} from "react-icons/fa";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            id: 'dashboard',
            title: 'Bảng Điều Khiển',
            icon: FaTachometerAlt,
            href: '/admin'
        },
        {
            id: 'users',
            title: 'Quản Lý Người Dùng',
            icon: FaUsers,
            href: '/admin/users'
        },
        {
            id: 'projects',
            title: 'Quản Lý Dự Án',
            icon: FaProjectDiagram,
            href: '/admin/projects'
        },
        {
            id: 'skills',
            title: 'Quản Lý Kỹ Năng',
            icon: FaTools,
            href: '/admin/skills'
        },
        {
            id: 'education',
            title: 'Quản Lý Học Vấn',
            icon: FaGraduationCap,
            href: '/admin/education'
        },
        {
            id: 'about',
            title: 'Quản Lý Giới Thiệu',
            icon: FaInfoCircle,
            href: '/admin/about'
        },
        {
            id: 'contact',
            title: 'Quản Lý Liên Hệ',
            icon: FaEnvelope,
            href: '/admin/contact'
        },
        {
            id: 'analytics',
            title: 'Phân Tích',
            icon: FaChartLine,
            href: '/admin/analytics'
        },
        {
            id: 'settings',
            title: 'Cài Đặt',
            icon: FaCog,
            href: '/admin/settings'
        }
    ];

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            <div className={`fixed left-0 top-0 z-50 h-full w-72 bg-gray-100 text-white transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:z-auto`}>
                <div className="p-4">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.id}>
                                <Link
                                    href={item.href || '#'}
                                    style={{
                                        textDecoration: 'none',
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: '500'
                                    }}
                                    className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                        pathname === item.href
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-200 hover:text-white'
                                    }`}
                                >
                                    <item.icon size={18} />
                                    <span>{item.title}</span>
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}