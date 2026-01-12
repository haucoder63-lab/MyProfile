"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaGraduationCap } from "react-icons/fa";
import { toast } from "sonner";

interface Education {
    _id: string;
    user_id: {
        _id: string;
        fullname: string;
        email: string;
    };
    school: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    grade?: string;
    description?: string;
    achievements: string[];
    certificates: string[];
    activities: string[];
    createdAt: string;
}

export default function EducationManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [educations, setEducations] = useState<Education[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchEducations();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchEducations = async () => {
        try {
            const response = await fetch('/api/educations', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setEducations(data);
            }
        } catch (error) {
            console.error('Error fetching educations:', error);
            toast.error('Lỗi khi tải dữ liệu học vấn');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteEducation = async (educationId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) return;

        try {
            const response = await fetch(`/api/educations/${educationId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa thông tin học vấn thành công');
                fetchEducations();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa thông tin học vấn');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa thông tin học vấn');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', educationData?: Education) => {
        setModalMode(mode);
        setSelectedEducation(educationData || null);
        setIsModalOpen(true);
    };

    const filteredEducations = educations.filter(education =>
        education.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        education.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        education.field_of_study.toLowerCase().includes(searchTerm.toLowerCase()) ||
        education.user_id.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <h1 className="text-2xl font-bold text-gray-900">Quản Lý Học Vấn</h1>
                        <p className="text-gray-600">Quản lý thông tin học vấn trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <FaPlus size={16} />
                        <span>Thêm Học Vấn</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm học vấn..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Tổng: {filteredEducations.length} bản ghi
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredEducations.map((education) => (
                            <div key={education._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center space-x-2">
                                        <FaGraduationCap className="text-blue-600" size={20} />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{education.school}</h3>
                                            <p className="text-sm text-gray-500">{education.user_id.fullname}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button 
                                            onClick={() => openModal('view', education)}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                            title="Xem chi tiết"
                                        >
                                            <FaEye size={14} />
                                        </button>
                                        <button 
                                            onClick={() => openModal('edit', education)}
                                            className="text-green-600 hover:text-green-900 p-1"
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteEducation(education._id)}
                                            className="text-red-600 hover:text-red-900 p-1"
                                            title="Xóa"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Bằng cấp:</span>
                                        <p className="text-sm text-gray-900">{education.degree}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Chuyên ngành:</span>
                                        <p className="text-sm text-gray-900">{education.field_of_study}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Thời gian:</span>
                                        <p className="text-sm text-gray-900">
                                            {new Date(education.start_date).toLocaleDateString('vi-VN')} - {
                                                education.end_date 
                                                    ? new Date(education.end_date).toLocaleDateString('vi-VN')
                                                    : 'Hiện tại'
                                            }
                                        </p>
                                    </div>
                                    {education.grade && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">Điểm:</span>
                                            <p className="text-sm text-gray-900">{education.grade}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>{education.achievements.length} thành tích</span>
                                        <span>{education.certificates.length} chứng chỉ</span>
                                        <span>{education.activities.length} hoạt động</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedEducation && modalMode === 'view' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Học Vấn</h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Trường học:</label>
                                    <p className="text-sm text-gray-900">{selectedEducation.school}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Bằng cấp:</label>
                                    <p className="text-sm text-gray-900">{selectedEducation.degree}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Chuyên ngành:</label>
                                    <p className="text-sm text-gray-900">{selectedEducation.field_of_study}</p>
                                </div>
                                {selectedEducation.grade && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Điểm số:</label>
                                        <p className="text-sm text-gray-900">{selectedEducation.grade}</p>
                                    </div>
                                )}
                            </div>
                            
                            {selectedEducation.description && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Mô tả:</label>
                                    <p className="text-sm text-gray-900 mt-1">{selectedEducation.description}</p>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Ngày bắt đầu:</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedEducation.start_date).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Ngày kết thúc:</label>
                                    <p className="text-sm text-gray-900">
                                        {selectedEducation.end_date 
                                            ? new Date(selectedEducation.end_date).toLocaleDateString('vi-VN')
                                            : 'Hiện tại'
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            {selectedEducation.achievements.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Thành tích:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedEducation.achievements.map((achievement, index) => (
                                            <li key={index} className="text-sm text-gray-900">{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {selectedEducation.certificates.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Chứng chỉ:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedEducation.certificates.map((certificate, index) => (
                                            <li key={index} className="text-sm text-gray-900">{certificate}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {selectedEducation.activities.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Hoạt động:</label>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedEducation.activities.map((activity, index) => (
                                            <li key={index} className="text-sm text-gray-900">{activity}</li>
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