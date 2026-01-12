"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { toast } from "sonner";

interface About {
    _id: string;
    user_id: {
        _id: string;
        fullname: string;
        email: string;
    };
    title: string;
    description: string;
    objectives: string[];
    skills_focus: string[];
    career_goals: string[];
    createdAt: string;
}

export default function AboutManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [abouts, setAbouts] = useState<About[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAbout, setSelectedAbout] = useState<About | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchAbouts();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchAbouts = async () => {
        try {
            const response = await fetch('/api/about', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setAbouts(data);
            }
        } catch (error) {
            console.error('Error fetching abouts:', error);
            toast.error('Lỗi khi tải dữ liệu giới thiệu');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteAbout = async (aboutId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa thông tin giới thiệu này?')) return;

        try {
            const response = await fetch(`/api/about/${aboutId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa thông tin giới thiệu thành công');
                fetchAbouts();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa thông tin giới thiệu');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa thông tin giới thiệu');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', aboutData?: About) => {
        setModalMode(mode);
        setSelectedAbout(aboutData || null);
        setIsModalOpen(true);
    };

    const filteredAbouts = abouts.filter(about =>
        about.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        about.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        about.user_id.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản Lý Giới Thiệu</h1>
                        <p className="text-gray-600">Quản lý thông tin giới thiệu trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <FaPlus size={16} />
                        <span>Thêm Giới Thiệu</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm giới thiệu..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Tổng: {filteredAbouts.length} bản ghi
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredAbouts.map((about) => (
                            <div key={about._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{about.title}</h3>
                                        <p className="text-sm text-gray-500">{about.user_id.fullname}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button 
                                            onClick={() => openModal('view', about)}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                            title="Xem chi tiết"
                                        >
                                            <FaEye size={14} />
                                        </button>
                                        <button 
                                            onClick={() => openModal('edit', about)}
                                            className="text-green-600 hover:text-green-900 p-1"
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteAbout(about._id)}
                                            className="text-red-600 hover:text-red-900 p-1"
                                            title="Xóa"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-gray-900 line-clamp-3">{about.description}</p>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>{about.objectives.length} mục tiêu</span>
                                        <span>{about.skills_focus.length} kỹ năng</span>
                                        <span>{about.career_goals.length} mục tiêu nghề nghiệp</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedAbout && modalMode === 'view' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Giới Thiệu</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tiêu đề:</label>
                                <p className="text-sm text-gray-900">{selectedAbout.title}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700">Mô tả:</label>
                                <p className="text-sm text-gray-900 mt-1">{selectedAbout.description}</p>
                            </div>
                            
                            {selectedAbout.objectives.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Mục tiêu:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedAbout.objectives.map((objective, index) => (
                                            <li key={index} className="text-sm text-gray-900">{objective}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {selectedAbout.skills_focus.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Kỹ năng tập trung:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedAbout.skills_focus.map((skill, index) => (
                                            <li key={index} className="text-sm text-gray-900">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {selectedAbout.career_goals.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Mục tiêu nghề nghiệp:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedAbout.career_goals.map((goal, index) => (
                                            <li key={index} className="text-sm text-gray-900">{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}