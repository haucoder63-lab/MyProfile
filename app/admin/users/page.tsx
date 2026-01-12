"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface User {
    _id: string;
    fullname: string;
    email: string;
    phone?: string;
    address?: string;
    specialization?: string;
    role: string;
    createdAt: string;
}

interface UserEditFormProps {
    user: User;
    onSave: (user: User) => void;
    onCancel: () => void;
}

function UserEditForm({ user, onSave, onCancel }: UserEditFormProps) {
    const [formData, setFormData] = useState({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        specialization: user.specialization || '',
        role: user.role
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                onSave(updatedUser);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi cập nhật người dùng');
            }
        } catch (error) {
            toast.error('Lỗi khi cập nhật người dùng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"
                 style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Họ tên</label>
                <Input
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" 
                style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Email</label>
                <Input
                    type="email"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"
                style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Số điện thoại</label>
                <Input
                    type="text"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"
                style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Địa chỉ</label>
                <Input
                    type="text"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"
                style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Chuyên ngành</label>
                <Input
                    type="text"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"
                style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '500',
                        fontStyle: 'normal'
                    }}
                >Vai trò</label>
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="user" style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}>Người dùng</option>
                    <option value="admin" style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}>Quản trị viên</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6 gap-2">
                <button
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Hủy
                </button>
                <button
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        fontWeight: '400',
                        fontStyle: 'normal',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Đang lưu...' : 'Lưu'}
                </button>
            </div>
        </form>
    );
}

interface UserCreateFormProps {
    onSave: (user: User) => void;
    onCancel: () => void;
}

function UserCreateForm({ onSave, onCancel }: UserCreateFormProps) {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        specialization: '',
        role: 'user'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newUser = await response.json();
                onSave(newUser);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi tạo người dùng');
            }
        } catch (error) {
            toast.error('Lỗi khi tạo người dùng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <Input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên ngành</label>
                <Input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6 gap-2">
                <button
                    type="button"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        fontStyle: 'normal',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        fontStyle: 'normal',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Đang tạo...' : 'Tạo'}
                </button>
            </div>
        </form>
    );
}

export default function UsersManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchUsers();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Lỗi khi tải dữ liệu người dùng');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa người dùng thành công');
                fetchUsers();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa người dùng');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa người dùng');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', userData?: User) => {
        setModalMode(mode);
        setSelectedUser(userData || null);
        setIsModalOpen(true);
    };

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.specialization && user.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        <h1 className="text-2xl font-bold text-gray-900"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '20px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                        }}
                        >Quản Lý Người Dùng</h1>
                        <p className="text-gray-600"  style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            fontWeight: '400',
                            fontStyle: 'italic'
                        }}>Quản lý thông tin người dùng trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                         style={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: '500',
                            fontStyle: 'normal',
                            border: 'none',
                            borderRadius: '10px'
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <FaPlus size={16} />
                        <span>Thêm Người Dùng</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm người dùng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="text-sm text-gray-500" style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                Tổng: {filteredUsers.length} người dùng
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}
                                    >
                                        Người dùng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                        Liên hệ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                        Chuyên ngành
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                        Ngày tạo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{
                                fontFamily: 'Roboto',
                                fontSize: '13px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((userData) => (
                                    <tr key={userData._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900" 
                                                style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}
                                                >{userData.fullname}</div>
                                                <div className="text-sm text-gray-500" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '400',
                                fontStyle: 'normal'
                            }}>{userData.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>{userData.phone || 'N/A'}</div>
                                            <div className="text-sm text-gray-500" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '400',
                                fontStyle: 'normal'
                            }}>{userData.address || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>{userData.specialization || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                userData.role === 'admin' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`} style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                                {userData.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}>
                                            {new Date(userData.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => openModal('view', userData)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                    title="Xem chi tiết"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => openModal('edit', userData)}
                                                    className="text-green-600 hover:text-green-900 p-1"
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(userData._id)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                    title="Xóa"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4" style={{
                            fontFamily: 'Roboto',
                            fontSize: '20px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                        }}>
                            {modalMode === 'view' && 'Chi Tiết Người Dùng'}
                            {modalMode === 'edit' && 'Chỉnh Sửa Người Dùng'}
                            {modalMode === 'create' && 'Thêm Người Dùng Mới'}
                        </h3>
                        
                        {selectedUser && modalMode === 'view' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700" 
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Họ tên:</label>
                                    <p className="text-sm text-gray-900" 
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.fullname}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700" 
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Email:</label>
                                    <p className="text-sm text-gray-900" 
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700" 
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Số điện thoại:</label>
                                    <p className="text-sm text-gray-900" 
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700" 
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Địa chỉ:</label>
                                    <p className="text-sm text-gray-900"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.address || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700" 
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Chuyên ngành:</label>
                                    <p className="text-sm text-gray-900"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.specialization || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700"
                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}
                                    >Vai trò:</label>
                                    <p className="text-sm text-gray-900"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        fontStyle: 'normal'
                                    }}
                                    >{selectedUser.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
                                </div>
                            </div>
                        )}

                        {modalMode === 'edit' && selectedUser && (
                            <UserEditForm 
                                user={selectedUser}
                                onSave={(updatedUser) => {
                                    setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
                                    setIsModalOpen(false);
                                    toast.success('Cập nhật người dùng thành công');
                                }}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        )}

                        {modalMode === 'create' && (
                            <UserCreateForm 
                                onSave={(newUser) => {
                                    setUsers([...users, newUser]);
                                    setIsModalOpen(false);
                                    toast.success('Thêm người dùng thành công');
                                }}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        )}

                        {modalMode === 'view' && (
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        fontStyle: 'normal',
                                        border: 'none',
                                        borderRadius: '10px'
                                    }}
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Đóng
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}