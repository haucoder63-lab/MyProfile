"use client";

import { useState, useEffect } from "react";
import { FaPalette, FaCogs, FaDatabase, FaLaptopCode, FaFileAlt } from "react-icons/fa";

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    _id: string;
    category: string;
    skills: Skill[];
    user_id: any;
}

export default function Skills() {
    const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchSkills();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const skillId = entry.target.getAttribute('data-skill-id');
                        if (skillId) {
                            setAnimatedSkills(prev => new Set([...prev, skillId]));
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        const skillElements = document.querySelectorAll('[data-skill-id]');
        skillElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [skillsData]);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/skills');
            const data = await response.json();
            if (Array.isArray(data)) {
                setSkillsData(data);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSkillsByCategory = (category: string) => {
        const categoryData = skillsData.find(item => item.category === category);
        return categoryData ? categoryData.skills : [];
    };

    const getCategoryGradient = (category: string) => {
        switch (category) {
            case 'Front-end': return 'from-blue-500 to-cyan-500';
            case 'Back-end': return 'from-green-500 to-emerald-500';
            case 'Database': return 'from-purple-500 to-pink-500';
            default: return 'from-gray-500 to-slate-500';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Front-end': return <FaPalette />;
            case 'Back-end': return <FaCogs />;
            case 'Database': return <FaDatabase />;
            default: return <FaLaptopCode />;
        }
    };

    const getSkillLevelColor = (level: number) => {
        if (level >= 80) return 'from-green-400 to-green-600';
        if (level >= 60) return 'from-blue-400 to-blue-600';
        if (level >= 40) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0"></div>
                </div>
            </div>
        );
    }

    const categories = ['Front-end', 'Back-end', 'Database'];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 animate-fade-in-up"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '36px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                        }}>
                            Kỹ Năng
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto animate-scale-in"></div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 animate-fade-in-up delay-200"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                        fontWeight: '400',
                        fontStyle: 'normal'
                    }}>
                        Các công nghệ và kỹ năng tôi đã học và áp dụng trong các dự án thực tế
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {categories.map((category, categoryIndex) => {
                        const skills = getSkillsByCategory(category);
                        return (
                            <div 
                                key={category} 
                                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up"
                                style={{ animationDelay: `${categoryIndex * 200}ms` }}
                            >
                                <div className="flex items-center mb-8">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryGradient(category)} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {getCategoryIcon(category)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '22px',
                                            fontWeight: '600',
                                            fontStyle: 'normal'
                                        }}>
                                            {category}
                                        </h3>
                                        <div className={`h-0.5 w-0 bg-gradient-to-r ${getCategoryGradient(category)} rounded-full group-hover:w-full transition-all duration-500`}></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {skills.map((skill, index) => {
                                        const skillId = `${category}-${skill.name}`;
                                        const isAnimated = animatedSkills.has(skillId);
                                        
                                        return (
                                            <div 
                                                key={index}
                                                data-skill-id={skillId}
                                                className="group/skill"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-sm font-semibold text-gray-700 group-hover/skill:text-gray-900 transition-colors"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '15px',
                                                        fontWeight: '500',
                                                        fontStyle: 'normal'
                                                    }}>
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-800 px-2 py-1 bg-gray-100 rounded-full group-hover/skill:bg-gray-200 transition-colors"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        fontStyle: 'normal'
                                                    }}>
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                                                        <div 
                                                            className={`h-full bg-gradient-to-r ${getSkillLevelColor(skill.level)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                                                            style={{
                                                                width: isAnimated ? `${skill.level}%` : '0%'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {skills.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaFileAlt className="text-2xl text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-sm"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}>
                                            Chưa có kỹ năng nào
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scale-in {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-scale-in {
                    animation: scale-in 0.6s ease-out 0.5s forwards;
                    transform: scaleX(0);
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }

                .bg-grid-pattern {
                    background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </div>
    );
}