"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface UserProfile {
    _id: string;
    fullname: string;
    birthday: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    avatar_url: string;
    createdAt: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/user');
            const users = await response.json();
            if (users && users.length > 0) {
                setProfile(users[0]);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Chưa có thông tin hồ sơ</h2>
                    <p className="text-gray-600">Vui lòng thêm thông tin cá nhân để hiển thị hồ sơ.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-2">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-sm p-4 mb-2">
                            <div className="text-center">
                                {profile.avatar_url ? (
                                    <Image
                                        src={profile.avatar_url}
                                        alt={profile.fullname}
                                        width={150}
                                        height={150}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-blue-500 flex items-center justify-center">
                                        <span className="text-3xl text-white font-semibold" 
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '30px',
                                            fontWeight: 'bolder',
                                            fontStyle: 'normal'
                                        }}
                                        >
                                            {profile.fullname.charAt(7).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2"
                                style={{
                                  fontFamily: 'Roboto',
                                  fontStyle: 'normal',
                                  fontWeight: '600',
                                  fontSize: '20px'
                                }}
                                >{profile.fullname}</h3>
                                {profile.specialization && (
                                    <p className="text-sm text-blue-600 font-medium"
                                    style={{
                                      fontFamily: 'Roboto',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      fontSize: '16px'
                                    }}
                                    >{profile.specialization}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm p-8 mb-2 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Họ Tên</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.fullname}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                         style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Email</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.email}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                         style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Phone</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.phone || 'Chưa cập nhật'}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                         style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Chuyên Nghành</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.specialization || 'Chưa cập nhật'}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                         style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Địa Chỉ</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.address || 'Chưa cập nhật'}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                                         style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '17px',
                                          fontWeight: '600',
                                          fontStyle: 'normal'
                                        }}
                                        >Ngày Sinh</h4>
                                        <p className="text-lg font-medium text-gray-900"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '18px',
                                          fontStyle: 'normal',
                                          fontWeight: '400'
                                        }}
                                        >{profile.birthday}</p>
                                        <hr className="my-4 border-gray-200"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}