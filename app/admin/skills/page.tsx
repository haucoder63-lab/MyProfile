"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { toast } from "sonner";

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    _id: string;
    user_id: {
        _id: string;
        fullname: string;
        email: string;
    };
    category: string;
    skills: Skill[];
    createdAt: string;
}

export default function SkillsManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkillCategory, setSelectedSkillCategory] = useState<SkillCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchSkills();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/skills', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setSkillCategories(data);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
            toast.error('Lỗi khi tải dữ liệu kỹ năng');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteSkillCategory = async (skillId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa danh mục kỹ năng này?')) return;

        try {
            const response = await fetch(`/api/skills/${skillId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa danh mục kỹ năng thành công');
                fetchSkills();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa danh mục kỹ năng');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa danh mục kỹ năng');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', skillData?: SkillCategory) => {
        setModalMode(mode);
        setSelectedSkillCategory(skillData || null);
        setIsModalOpen(true);
    };

    const getSkillLevelColor = (level: number) => {
        if (level >= 80) return 'bg-green-500';
        if (level >= 60) return 'bg-blue-500';
        if (level >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getSkillLevelText = (level: number) => {
        if (level >= 80) return 'Chuyên gia';
        if (level >= 60) return 'Thành thạo';
        if (level >= 40) return 'Trung bình';
        return 'Cơ bản';
    };

    const filteredSkillCategories = skillCategories.filter(skillCategory =>
        skillCategory.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skillCategory.skills.some(skill => 
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        skillCategory.user_id.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <h1 className="text-2xl font-bold text-gray-900" style={{
                            fontFamily: 'Roboto',
                            fontSize: '28px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                        }}>Quản Lý Kỹ Năng</h1>
                        <p className="text-gray-600" style={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                        }}>Quản lý thông tin kỹ năng trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '15px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                        }}
                    >
                        <FaPlus size={16} />
                        <span>Thêm Danh Mục Kỹ Năng</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm kỹ năng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Tổng: {filteredSkillCategories.length} danh mục
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredSkillCategories.map((skillCategory) => (
                            <div key={skillCategory._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{skillCategory.category}</h3>
                                        <p className="text-sm text-gray-500">{skillCategory.user_id.fullname}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button 
                                            onClick={() => openModal('view', skillCategory)}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                            title="Xem chi tiết"
                                        >
                                            <FaEye size={14} />
                                        </button>
                                        <button 
                                            onClick={() => openModal('edit', skillCategory)}
                                            className="text-green-600 hover:text-green-900 p-1"
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteSkillCategory(skillCategory._id)}
                                            className="text-red-600 hover:text-red-900 p-1"
                                            title="Xóa"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {skillCategory.skills.slice(0, 3).map((skill, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">{skill.name}</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-500 w-8">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                    {skillCategory.skills.length > 3 && (
                                        <p className="text-xs text-gray-500 text-center">
                                            +{skillCategory.skills.length - 3} kỹ năng khác
                                        </p>
                                    )}
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-xs text-gray-500">
                                        Tạo: {new Date(skillCategory.createdAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedSkillCategory && modalMode === 'view' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Danh Mục Kỹ Năng</h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Danh mục:</label>
                                    <p className="text-sm text-gray-900">{selectedSkillCategory.category}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Người tạo:</label>
                                    <p className="text-sm text-gray-900">{selectedSkillCategory.user_id.fullname}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-3 block">Danh sách kỹ năng:</label>
                                <div className="space-y-3">
                                    {selectedSkillCategory.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                                                            style={{ width: `${skill.level}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{skill.level}%</span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                skill.level >= 80 ? 'bg-green-100 text-green-800' :
                                                skill.level >= 60 ? 'bg-blue-100 text-blue-800' :
                                                skill.level >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {getSkillLevelText(skill.level)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
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