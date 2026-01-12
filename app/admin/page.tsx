"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import MonthlySales from "@/components/admin/MonthlySales";
import MonthlyTarget from "@/components/admin/MonthlyTarget";
import Statistics from "@/components/admin/Statistics";
import { toast } from "sonner";

interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    createdAt: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    user_id: {
        fullname: string;
        email: string;
    };
    createdAt: string;
}

export default function AdminDashboard() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchData();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchData = async () => {
        try {
            const [usersRes, projectsRes] = await Promise.all([
                fetch('/api/user', { credentials: 'include' }),
                fetch('/api/projects', { credentials: 'include' })
            ]);

            if (usersRes.ok) {
                const usersData = await usersRes.json();
                setUsers(usersData);
            }

            if (projectsRes.ok) {
                const projectsData = await projectsRes.json();
                setProjects(projectsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Lỗi khi tải dữ liệu');
        } finally {
            setDataLoading(false);
        }
    };

    if (loading || dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h1>
                    <p className="text-gray-600 mb-6">Bạn cần quyền admin để truy cập trang này.</p>
                    <button 
                        onClick={() => router.push('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900" style={{
                        fontFamily: 'Roboto',
                        fontSize: '28px',
                        fontWeight: '700',
                        fontStyle: 'normal'
                    }}>Bảng Điều Khiển</h1>
                    <p className="text-gray-600" style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}>Chào mừng trở lại, {user?.fullname}!</p>
                </div>

                <DashboardStats />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <MonthlySales />
                    </div>
                    <div>
                        <MonthlyTarget />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <Statistics />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Hoạt Động Gần Đây</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-sm font-medium">U</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Người dùng mới đăng ký</p>
                                    <p className="text-xs text-gray-500">2 phút trước</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 text-sm font-medium">P</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Dự án mới được tạo</p>
                                    <p className="text-xs text-gray-500">5 phút trước</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 text-sm font-medium">S</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Kỹ năng được cập nhật</p>
                                    <p className="text-xs text-gray-500">10 phút trước</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tổng Quan Hệ Thống</h3>
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                                <div className="text-sm text-gray-600">Tổng Người Dùng</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{projects.length}</div>
                                <div className="text-sm text-gray-600">Tổng Dự Án</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</div>
                                <div className="text-sm text-gray-600">Quản Trị Viên</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}