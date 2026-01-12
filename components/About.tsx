"use client";

import { useState, useEffect, useRef } from "react";
import { FaBullseye, FaCogs, FaRocket, FaUser } from "react-icons/fa";

interface About {
    _id: string;
    title: string;
    description: string;
    objectives: string[];
    skills_focus: string[];
    career_goals: string[];
    user_id: any;
    createdAt: string;
}

export default function About() {
    const [about, setAbout] = useState<About[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchAbout();
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const fetchAbout = async () => {
        try {
            const response = await fetch('/api/about');
            const data = await response.json();
            if (Array.isArray(data)) {
                setAbout(data);
            }
        } catch (error) {
            console.error('Error fetching about:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div 
                className="relative bg-white py-16 overflow-hidden min-h-screen"
                style={{ paddingTop: '100px' }}
            >
                <div className="flex justify-center items-center h-full">
                    <div className="text-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                        <p 
                            className="text-gray-600"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}
                        >
                            Đang tải thông tin...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={sectionRef}
            className="relative bg-white py-16 overflow-hidden min-h-screen"
            style={{ paddingTop: '100px' }}
        >
            <div className="relative max-w-screen-2xl mx-auto px-6 z-50">
                <div className="text-center mb-12">
                    <h2 
                        className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '36px',
                            fontWeight: '700'
                        }}
                    >
                        Giới Thiệu
                    </h2>
                    <p 
                        className="text-gray-600 text-lg max-w-2xl mx-auto"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'italic'
                        }}
                    >
                        Thông tin về bản thân và định hướng phát triển nghề nghiệp
                    </p>
                </div>

                {about.map((item, index) => (
                    <div 
                        key={item._id} 
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
                    >
                        <div className="mb-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUser className="text-2xl text-white" />
                            </div>
                            <h3 
                                className="text-3xl font-bold text-gray-900 mb-4"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '28px',
                                    fontWeight: '700'
                                }}
                            >
                                {item.title}
                            </h3>
                            <p 
                                className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    lineHeight: '1.8'
                                }}
                            >
                                {item.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                        <FaBullseye className="text-xl text-white" />
                                    </div>
                                    <h4 
                                        className="text-xl font-bold text-gray-800"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '20px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        Mục Tiêu
                                    </h4>
                                </div>
                                <ul className="space-y-3">
                                    {item.objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span 
                                                className="text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {objective}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                                        <FaCogs className="text-xl text-white" />
                                    </div>
                                    <h4 
                                        className="text-xl font-bold text-gray-800"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '20px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        Kỹ Năng Tập Trung
                                    </h4>
                                </div>
                                <ul className="space-y-3">
                                    {item.skills_focus.map((skill, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span 
                                                className="text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <FaRocket className="text-xl text-white" />
                                    </div>
                                    <h4 
                                        className="text-xl font-bold text-gray-800"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '20px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        Mục Tiêu Nghề Nghiệp
                                    </h4>
                                </div>
                                <ul className="space-y-3">
                                    {item.career_goals.map((goal, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span 
                                                className="text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {goal}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                {about.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-3xl text-blue-400" />
                        </div>
                        <h3 
                            className="text-xl font-semibold text-gray-900 mb-3"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                                fontWeight: '600'
                            }}
                        >
                            Chưa có thông tin giới thiệu
                        </h3>
                        <p 
                            className="text-gray-500 mb-4"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}
                        >
                            Thông tin giới thiệu sẽ được hiển thị tại đây.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                            <p 
                                className="text-yellow-800 text-sm"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '14px',
                                    fontWeight: '400'
                                }}
                            >
                                Vui lòng thêm thông tin giới thiệu qua trang quản trị để hiển thị nội dung.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}