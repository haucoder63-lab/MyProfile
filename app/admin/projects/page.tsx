"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "sonner";

interface Project {
    _id: string;
    title: string;
    description: string;
    image_url?: string;
    role: string;
    team_size: number;
    github_url?: string;
    demo_url?: string;
    start_date: string;
    end_date?: string;
    status: string;
    user_id?: {
        _id: string;
        fullname: string;
        email: string;
    };
    createdAt: string;
}

export default function ProjectsManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchProjects();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Lỗi khi tải dữ liệu dự án');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa dự án thành công');
                fetchProjects();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa dự án');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa dự án');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', projectData?: Project) => {
        setModalMode(mode);
        setSelectedProject(projectData || null);
        setIsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'planning': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Hoàn thành';
            case 'in-progress': return 'Đang thực hiện';
            case 'planning': return 'Lên kế hoạch';
            default: return status;
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.user_id?.fullname && project.user_id.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        }}>Quản Lý Dự Án</h1>
                        <p className="text-gray-600" style={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                        }}>Quản lý thông tin dự án trong hệ thống</p>
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
                        <span>Thêm Dự Án</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm dự án..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                />
                            </div>
                            <div className="text-sm text-gray-500" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '400',
                                fontStyle: 'normal'
                            }}>
                                Tổng: {filteredProjects.length} dự án
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dự án
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tác giả
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {project.image_url && (
                                                    <img 
                                                        src={project.image_url} 
                                                        alt={project.title}
                                                        className="w-10 h-10 rounded-lg object-cover mr-3"
                                                    />
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                                                    <div className="text-sm text-gray-500 max-w-xs truncate">{project.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{project.user_id?.fullname || 'N/A'}</div>
                                            <div className="text-sm text-gray-500">{project.user_id?.email || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{project.role}</div>
                                            <div className="text-sm text-gray-500">Nhóm {project.team_size} người</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                                {getStatusText(project.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => openModal('view', project)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                    title="Xem chi tiết"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => openModal('edit', project)}
                                                    className="text-green-600 hover:text-green-900 p-1"
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteProject(project._id)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                    title="Xóa"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                                {project.demo_url && (
                                                    <a 
                                                        href={project.demo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-purple-600 hover:text-purple-900 p-1"
                                                        title="Xem demo"
                                                    >
                                                        <FaExternalLinkAlt size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedProject && modalMode === 'view' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Dự Án</h3>
                        
                        <div className="space-y-4">
                            {selectedProject.image_url && (
                                <div>
                                    <img 
                                        src={selectedProject.image_url} 
                                        alt={selectedProject.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Tên dự án:</label>
                                    <p className="text-sm text-gray-900">{selectedProject.title}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Vai trò:</label>
                                    <p className="text-sm text-gray-900">{selectedProject.role}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Kích thước nhóm:</label>
                                    <p className="text-sm text-gray-900">{selectedProject.team_size} người</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Trạng thái:</label>
                                    <p className="text-sm text-gray-900">{getStatusText(selectedProject.status)}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700">Mô tả:</label>
                                <p className="text-sm text-gray-900 mt-1">{selectedProject.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Ngày bắt đầu:</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedProject.start_date).toLocaleDateString('vi-VN')}</p>
                                </div>
                                {selectedProject.end_date && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Ngày kết thúc:</label>
                                        <p className="text-sm text-gray-900">{new Date(selectedProject.end_date).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedProject.github_url && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">GitHub:</label>
                                        <a 
                                            href={selectedProject.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 break-all"
                                        >
                                            {selectedProject.github_url}
                                        </a>
                                    </div>
                                )}
                                {selectedProject.demo_url && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Demo:</label>
                                        <a 
                                            href={selectedProject.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 break-all"
                                        >
                                            {selectedProject.demo_url}
                                        </a>
                                    </div>
                                )}
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