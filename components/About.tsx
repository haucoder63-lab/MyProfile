"use client";

import { useState, useEffect } from "react";

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

    useEffect(() => {
        fetchAbout();
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
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-1">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="text-center mb-1">
                    <h2 className="text-3xl font-medium text-gray-900 mb-3" 
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '25px',
                        fontWeight: '600',
                        fontStyle: 'normal'
                    }}
                    >Giới Thiệu</h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        fontWeight: '400',
                        fontStyle: 'italic'
                    }}
                    >
                        Thông tin về bản thân và mục tiêu nghề nghiệp
                    </p>
                </div>

                {about.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-1">
                        <div className="mb-3">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '22px',
                                fontWeight: '600',
                                fontStyle: 'normal'
                            }}
                            >{item.title}</h3>
                            <p className="text-lg text-gray-700 leading-relaxed"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                                fontWeight: '400',
                                fontStyle: 'normal',
                                lineHeight: '1.8'
                            }}
                            >{item.description}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Mục Tiêu
                                </h4>
                                <ul className="space-y-1">
                                    {item.objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}
                                            >{objective}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Kỹ Năng Tập Trung
                                </h4>
                                <ul className="space-y-1">
                                    {item.skills_focus.map((skill, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}
                                            >{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    Mục Tiêu Nghề Nghiệp
                                </h4>
                                <ul className="space-y-1">
                                    {item.career_goals.map((goal, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}
                                            >{goal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                {about.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có thông tin giới thiệu</h3>
                        <p className="text-gray-500">Thông tin giới thiệu sẽ được hiển thị tại đây.</p>
                    </div>
                )}
            </div>
        </div>
    );
}