"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaGraduationCap, FaUserShield } from "react-icons/fa";

interface UserProfile {
    _id: string;
    fullname: string;
    birthday: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    role: string;
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
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch('/api/user', {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const users = await response.json();
            if (users && users.length > 0) {
                setProfile(users[0]);
            }
        } catch (error: any) {
            console.error('Error fetching profile:', error);
            if (error.name === 'AbortError') {
                console.error('Request timed out');
            }
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
                    <p className="text-gray-600">Thông tin hồ sơ sẽ được cập nhật sớm.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-2">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/90">
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    {profile.avatar_url ? (
                                        <Image
                                            src={profile.avatar_url}
                                            alt={profile.fullname}
                                            width={120}
                                            height={120}
                                            className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-blue-100 transition-all duration-300 hover:ring-blue-200"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-4 ring-blue-100 transition-all duration-300 hover:ring-blue-200 hover:shadow-lg">
                                            <span className="text-3xl text-white font-semibold">
                                                {profile.fullname.charAt(7).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white-100 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600"
                                style={{
                                  fontFamily: 'Roboto',
                                  fontStyle: 'normal',
                                  fontWeight: '700',
                                  fontSize: '22px'
                                }}
                                >{profile.fullname}</h3>
                                {profile.specialization && (
                                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-100 transition-all duration-300 hover:bg-blue-100 mb-2">
                                        <FaGraduationCap className="text-blue-500 mr-2" size={30} />
                                        <p className="text-blue-700 font-medium"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontStyle: 'normal',
                                          fontWeight: '500',
                                          fontSize: '15px'
                                        }}
                                        >{profile.specialization}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-lg p-8 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-white/90">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                                                <FaUser className="text-blue-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                            style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Họ Tên</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-blue-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.fullname}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-blue-200 to-transparent transition-all duration-300 group-hover:from-blue-400"></div>
                                    </div>

                                      <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                                                <FaMapMarkerAlt className="text-blue-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                             style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Chuyên Nghành</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-blue-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.specialization}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-blue-200 to-transparent transition-all duration-300 group-hover:from-blue-400"></div>
                                    </div>


                                    <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-purple-100 group-hover:scale-110">
                                                <FaPhone className="text-purple-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                             style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Phone</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-purple-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.phone || 'Chưa cập nhật'}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-purple-200 to-transparent transition-all duration-300 group-hover:from-purple-400"></div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                       <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-green-100 group-hover:scale-110">
                                                <FaEnvelope className="text-green-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                             style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Email</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-green-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.email}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-green-200 to-transparent transition-all duration-300 group-hover:from-green-400"></div>
                                    </div>
                                    <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-red-100 group-hover:scale-110">
                                                <FaMapMarkerAlt className="text-red-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                             style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Địa Chỉ</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-red-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.address || 'Chưa cập nhật'}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-red-200 to-transparent transition-all duration-300 group-hover:from-red-400"></div>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center mb-3 transition-all duration-300 group-hover:translate-x-1">
                                            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-yellow-100 group-hover:scale-110">
                                                <FaBirthdayCake className="text-yellow-500" size={16} />
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                                             style={{
                                              fontFamily: 'Roboto',
                                              fontSize: '11px',
                                              fontWeight: '600',
                                              fontStyle: 'normal'
                                            }}
                                            >Ngày Sinh</h4>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 ml-14 transition-colors duration-300 group-hover:text-yellow-600"
                                        style={{
                                          fontFamily: 'Roboto',
                                          fontSize: '15px',
                                          fontStyle: 'normal',
                                          fontWeight: '500'
                                        }}
                                        >{profile.birthday}</p>
                                        <div className="ml-14 mt-2 h-px bg-gradient-to-r from-yellow-200 to-transparent transition-all duration-300 group-hover:from-yellow-400"></div>
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