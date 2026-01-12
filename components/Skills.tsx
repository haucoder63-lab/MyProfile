"use client";

import { useState, useEffect } from "react";

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

    useEffect(() => {
        fetchSkills();
    }, []);

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

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Front-end': return 'bg-blue-500';
            case 'Back-end': return 'bg-green-500';
            case 'Database': return 'bg-purple-500';
            case 'OTHER SKILLS': return 'bg-cyan-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const categories = ['Front-end', 'Back-end', 'Database'];

    return (
        <div className="bg-gray-50 py-2">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-medium text-gray-900 mb-3" 
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '25px',
                        fontWeight: '800',
                        fontStyle: 'normal'
                    }}
                    >Kỹ Năng</h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                        fontWeight: '400',
                        fontStyle: 'italic'
                    }}
                    >
                        Các công nghệ và kỹ năng tôi đã học và áp dụng
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const skills = getSkillsByCategory(category);
                        return (
                            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center mb-6">
                                    <div className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(category)} mr-3`}></div>
                                    <h3 className="text-lg font-medium text-gray-900"
                                    style={{
                                        fontStyle: 'normal',
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        fontWeight: '600'
                                    }}
                                    >{category}</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                                <span className="text-sm font-medium text-gray-900">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-500 ${getCategoryColor(category)}`}
                                                    style={{width: `${skill.level}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {skills.length === 0 && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 text-sm">Chưa có kỹ năng nào</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}