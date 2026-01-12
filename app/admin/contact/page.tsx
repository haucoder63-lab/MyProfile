"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";

interface SocialLink {
    platform: string;
    url: string;
}

interface Contact {
    _id: string;
    user_id: {
        _id: string;
        fullname: string;
        email: string;
    };
    email: string;
    phone: string;
    address: string;
    social_links: SocialLink[];
    availability: string;
    createdAt: string;
}

export default function ContactManagement() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.push('/login');
                return;
            }
            fetchContacts();
        }
    }, [isAuthenticated, user, loading, router]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Lỗi khi tải dữ liệu liên hệ');
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteContact = async (contactId: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa thông tin liên hệ này?')) return;

        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                toast.success('Xóa thông tin liên hệ thành công');
                fetchContacts();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Lỗi khi xóa thông tin liên hệ');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa thông tin liên hệ');
        }
    };

    const openModal = (mode: 'view' | 'edit' | 'create', contactData?: Contact) => {
        setModalMode(mode);
        setSelectedContact(contactData || null);
        setIsModalOpen(true);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.user_id.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
                        }}>Quản Lý Liên Hệ</h1>
                        <p className="text-gray-600" style={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                        }}>Quản lý thông tin liên hệ trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <FaPlus size={16} />
                        <span>Thêm Liên Hệ</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm liên hệ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Tổng: {filteredContacts.length} bản ghi
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredContacts.map((contact) => (
                            <div key={contact._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{contact.user_id.fullname}</h3>
                                        <p className="text-sm text-gray-500">Thông tin liên hệ</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button 
                                            onClick={() => openModal('view', contact)}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                            title="Xem chi tiết"
                                        >
                                            <FaEye size={14} />
                                        </button>
                                        <button 
                                            onClick={() => openModal('edit', contact)}
                                            className="text-green-600 hover:text-green-900 p-1"
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteContact(contact._id)}
                                            className="text-red-600 hover:text-red-900 p-1"
                                            title="Xóa"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <FaEnvelope className="text-blue-600" size={14} />
                                        <span className="text-sm text-gray-900">{contact.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaPhone className="text-green-600" size={14} />
                                        <span className="text-sm text-gray-900">{contact.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaMapMarkerAlt className="text-red-600" size={14} />
                                        <span className="text-sm text-gray-900 line-clamp-2">{contact.address}</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>{contact.social_links.length} mạng xã hội</span>
                                        <span className={`px-2 py-1 rounded-full ${
                                            contact.availability === 'available' ? 'bg-green-100 text-green-800' :
                                            contact.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {contact.availability === 'available' ? 'Có thể liên hệ' :
                                             contact.availability === 'busy' ? 'Bận' : 'Không có thể'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedContact && modalMode === 'view' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Liên Hệ</h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email:</label>
                                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Số điện thoại:</label>
                                    <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700">Địa chỉ:</label>
                                <p className="text-sm text-gray-900 mt-1">{selectedContact.address}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tình trạng:</label>
                                <p className="text-sm text-gray-900">
                                    {selectedContact.availability === 'available' ? 'Có thể liên hệ' :
                                     selectedContact.availability === 'busy' ? 'Bận' : 'Không có thể'}
                                </p>
                            </div>
                            
                            {selectedContact.social_links.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Mạng xã hội:</label>
                                    <div className="space-y-2">
                                        {selectedContact.social_links.map((link, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-900">{link.platform}</span>
                                                <a 
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:text-blue-800 break-all"
                                                >
                                                    {link.url}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
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