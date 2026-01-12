"use client";

import { FaUsers, FaShoppingCart, FaArrowUp, FaArrowDown } from "react-icons/fa";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <div className="flex items-center mt-2">
                        {isPositive ? (
                            <FaArrowUp className="text-green-500 mr-1" size={12} />
                        ) : (
                            <FaArrowDown className="text-red-500 mr-1" size={12} />
                        )}
                        <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {change}
                        </span>
                    </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard
                title="Khách Hàng"
                value="3,782"
                change="11.01%"
                isPositive={true}
                icon={<FaUsers className="text-blue-600" size={24} />}
            />
            <StatCard
                title="Đơn Hàng"
                value="5,359"
                change="4.05%"
                isPositive={false}
                icon={<FaShoppingCart className="text-green-600" size={24} />}
            />
            <StatCard
                title="Doanh Thu"
                value="$45,2K"
                change="2.59%"
                isPositive={true}
                icon={<FaShoppingCart className="text-purple-600" size={24} />}
            />
            <StatCard
                title="Tăng Trưởng"
                value="12.5%"
                change="0.95%"
                isPositive={true}
                icon={<FaArrowUp className="text-orange-600" size={24} />}
            />
        </div>
    );
}