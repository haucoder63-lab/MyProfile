"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        setIsLoading(true);

        try {
            await login(email, password);
            toast.success('Đăng nhập thành công!', {
                description: 'Chào mừng bạn quay trở lại'
            });
            
            setTimeout(() => {
                router.push('/');
            }, 1000);
            
        } catch (error: any) {
            toast.error('Đăng nhập thất bại', {
                description: error.message || 'Email hoặc mật khẩu không đúng'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-8 lg:p-12">
                            <div className="max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <Image 
                                        src="/image/Logo.png" 
                                        alt="logo" 
                                        width={250} 
                                        height={250}
                                        className="mx-auto mb-4"
                                    />
                                    <p className="text-gray-600" 
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        fontWeight: '400',
                                        fontStyle: 'italic'
                                    }}
                                    >
                                        Vui lòng đăng nhập vào tài khoản của bạn
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: '500'
                                        }}
                                        >
                                            Địa chỉ email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập email của bạn"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2"
                                           style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: '500'
                                        }}
                                        >
                                            Mật khẩu
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập mật khẩu của bạn"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <button
                                    style={{
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: "500"
                                    }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Đang đăng nhập...
                                            </div>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 lg:p-12 flex items-center">
                            <div className="text-white">
                                <h3 className="text-3xl font-bold mb-6" 
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '23px',
                                    fontWeight: '500',
                                    fontStyle: 'normal'
                                }}
                                >
                                    Chúng tôi không chỉ là một công ty
                                </h3>
                                <p className="text-blue-100 text-lg leading-relaxed mb-8"   style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '20px',
                                    fontWeight: '400',
                                    fontStyle: 'italic'
                                }}>
                                    Chúng tôi là đối tác đáng tin cậy trong hành trình phát triển công nghệ của bạn. 
                                    Với đội ngũ chuyên nghiệp và kinh nghiệm, chúng tôi cam kết mang đến những 
                                    giải pháp tốt nhất cho doanh nghiệp của bạn.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                                        <span className="text-blue-100" style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '17px',
                                    fontWeight: '500',
                                    fontStyle: 'normal'
                                }}>Giải pháp công nghệ hiện đại</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                                        <span className="text-blue-100" style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '17px',
                                    fontWeight: '500',
                                    fontStyle: 'normal'
                                }}>Đội ngũ chuyên nghiệp</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                                        <span className="text-blue-100" style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '17px',
                                    fontWeight: '500',
                                    fontStyle: 'normal'
                                }}>Hỗ trợ 24/7</span>
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