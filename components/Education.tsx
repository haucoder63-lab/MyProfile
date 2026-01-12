"use client";

import { useState, useEffect, useRef } from "react";
import { FaGraduationCap, FaTrophy, FaCertificate, FaUsers } from "react-icons/fa";

interface Achievement {
    date: string;
    title: string;
    description: string;
}

interface Certificate {
    date: string;
    title: string;
    issuer: string;
}

interface Activity {
    date: string;
    title: string;
    description: string;
}

interface Education {
    _id: string;
    school_name: string;
    gpa: string;
    achievements: Achievement[];
    certificates: Certificate[];
    activities: Activity[];
    user_id: any;
    createdAt: string;
}

export default function Education() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchEducations();
        
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

    const fetchEducations = async () => {
        try {
            const response = await fetch('/api/educations');
            const data = await response.json();
            if (Array.isArray(data)) {
                setEducations(data);
            }
        } catch (error) {
            console.error('Error fetching educations:', error);
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
        <div className="bg-white py-4">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-medium text-gray-900 mb-3" 
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '25px',
                        fontWeight: '600',
                        fontStyle: 'normal'
                    }}
                    >Học Vấn</h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        fontWeight: '400',
                        fontStyle: 'italic'
                    }}
                    >
                        Quá trình học tập và các thành tích đạt được
                    </p>
                </div>

                {educations.map((education) => (
                    <div key={education._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '22px',
                                fontWeight: '600',
                                fontStyle: 'normal'
                            }}
                            >{education.school_name}</h3>
                            <p className="text-lg text-blue-600 font-medium"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                                fontWeight: '500',
                                fontStyle: 'normal'
                            }}
                            >GPA: {education.gpa}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    ></div>
                                    Thành Tích
                                </h4>
                                <div className="space-y-4">
                                    {education.achievements.map((achievement, index) => (
                                        <div key={index} className="border-l-2 border-green-200 pl-4">
                                            <div className="text-sm text-green-600 font-medium mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{achievement.date}</div>
                                            <h5 className="font-medium text-gray-900 mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{achievement.title}</h5>
                                            <p className="text-sm text-gray-600"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'italic'
                                            }}
                                            >{achievement.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Chứng Chỉ
                                </h4>
                                <div className="space-y-4">
                                    {education.certificates.map((certificate, index) => (
                                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                                            <div className="text-sm text-blue-600 font-medium mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{certificate.date}</div>
                                            <h5 className="font-medium text-gray-900 mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{certificate.title}</h5>
                                            <p className="text-sm text-gray-600"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'italic'
                                            }}
                                            >{certificate.issuer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    fontStyle: 'normal'
                                }}
                                >
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    Hoạt Động
                                </h4>
                                <div className="space-y-4">
                                    {education.activities.map((activity, index) => (
                                        <div key={index} className="border-l-2 border-purple-200 pl-4">
                                            <div className="text-sm text-purple-600 font-medium mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{activity.date}</div>
                                            <h5 className="font-medium text-gray-900 mb-1"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                            >{activity.title}</h5>
                                            <p className="text-sm text-gray-600"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'italic'
                                            }}
                                            >{activity.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {educations.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có thông tin học vấn</h3>
                        <p className="text-gray-500">Thông tin học vấn sẽ được hiển thị tại đây.</p>
                    </div>
                )}
            </div>
        </div>
    );
}