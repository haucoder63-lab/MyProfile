"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface Technology {
    category: string;
    items: string[];
}

interface Project {
    _id: string;
    title: string;
    description: string;
    image_url?: string;
    role: string;
    team_size: number;
    github_url: string;
    demo_url: string;
    start_date: string;
    end_date: string;
    technologies: Technology[];
    main_features: string[];
    responsibilities: string[];
    achievements: string[];
    project_type: string;
    status: string;
    grade: string;
    createdAt: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const isValidUrl = (string: string) => {
        if (!string || string.trim() === "") return false;
        
        if (string.startsWith('/')) return true;
        
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const fetchProjects = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch('/api/projects', {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error);
            if (error.name === 'AbortError') {
                console.error('Request timed out');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { 
            month: '2-digit', 
            year: 'numeric' 
        }).replace('tháng ', '').replace(', ', '/');
    };

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="bg-white py-2">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-medium text-gray-900 mb-3" 
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '25px',
                        fontWeight: '600',
                        fontStyle: 'normal'
                    }}
                    >Dự Án</h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        fontWeight: '400',
                        fontStyle: 'italic'
                    }}
                    >
                         dự án nổi bật tôi đã thực hiện với công nghệ hiện đại
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow min-h-[500px]">
                            <div className="relative h-80">
                                {project.image_url && project.image_url.trim() !== "" && isValidUrl(project.image_url) ? (
                                    project.image_url.startsWith('/') ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                               style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )
                                ) : (
                                    <div className="w-full h-full bg-gray-200"></div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 rounded text-xs font-medium"
                                    style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            fontStyle: 'normal'
                                        }}
                                    >
                                        {project.project_type === 'academic' ? 'Học tập' : 
                                         project.project_type === 'professional' ? 'Chuyên nghiệp' : 
                                         project.project_type}
                                    </span>
                                </div>
                                {project.grade && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 bg-green-500 text-white rounded text-xs font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fontStyle: 'normal'
                                        }}>
                                            {project.grade}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="mb-3">
                                    <h3 className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                                    onClick={() => openModal(project)}
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >{project.title}</h3>
                                    <p className="text-sm text-blue-600 font-medium"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '17px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >{project.role}</p>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
                                  style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '17px',
                                        fontWeight: '400',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {project.description}
                                </p>

                                <div className="mb-4">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <span style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}>{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                                        <span className="mx-2">•</span>
                                        <span style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}>{project.team_size} thành viên</span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 1).map((tech) => (
                                            tech.items.slice(0, 4).map((item, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                                style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontStyle: 'normal'
                                            }}
                                                >
                                                    {item}
                                                </span>
                                            ))
                                        ))}
                                        {project.technologies.length > 1 && (
                                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                                                +{project.technologies.slice(1).reduce((acc, tech) => acc + tech.items.length, 0)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex space-x-2">
                                        {project.github_url && (
                                            <Link style={{
                                                textDecoration: 'none',
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center px-3 py-1.5 bg-gray-900 text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                                                </svg>
                                                GitHub
                                            </Link>
                                        )}
                                        {project.demo_url && (
                                            <Link style={{
                                                textDecoration: 'none',
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}
                                                href={project.demo_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                </svg>
                                                Demo
                                            </Link>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400" 
                                    style={{
                                                textDecoration: 'none',
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                fontStyle: 'normal'
                                            }}>
                                        {project.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có dự án</h3>
                        <p className="text-gray-500">Các dự án sẽ được hiển thị tại đây.</p>
                    </div>
                )}
            </div>

            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                                fontWeight: '700',
                                fontStyle: 'normal'
                            }}
                            >{selectedProject.title}</h2>
                            <Button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-red-600 transition-colors bg-transparent"
                                style={{
                                    fontSize: '20px'
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                style={{
                                    fontSize: '20px'
                                }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </Button>
                        </div>

                        <div className="p-6">
                            {selectedProject.image_url && selectedProject.image_url.trim() !== "" && isValidUrl(selectedProject.image_url) && (
                                <div className="mb-6">
                                    {selectedProject.image_url.startsWith('/') ? (
                                        <img
                                            src={selectedProject.image_url}
                                            alt={selectedProject.title}
                                            className="w-full h-50 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="relative w-full h-64">
                                            <Image
                                                src={selectedProject.image_url}
                                                alt={selectedProject.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >Thông Tin</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Vai trò:</span> {selectedProject.role}</p>
                                        <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Loại dự án:</span> {selectedProject.project_type === 'academic' ? 'Học tập' : 'Chuyên nghiệp'}</p>
                                        <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Số thành viên:</span> {selectedProject.team_size}</p>
                                        <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Thời gian:</span> {formatDate(selectedProject.start_date)} - {formatDate(selectedProject.end_date)}</p>
                                        <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Trạng thái:</span> {selectedProject.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}</p>
                                        {selectedProject.grade && <p><span className="font-medium"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '700'
                                        }}
                                        >Điểm:</span> {selectedProject.grade}</p>}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >Liên Kết</h3>
                                    <div className="space-y-2">
                                        {selectedProject.github_url && (
                                            <Link
                                                href={selectedProject.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'italic',
                                        color: 'black',
                                        lineHeight: '1.6'
                                    }}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                                                </svg>
                                                GitHub Repository
                                            </Link>
                                        )}
                                        {selectedProject.demo_url && (
                                            <Link
                                                href={selectedProject.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                  style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'italic',
                                        color: 'purple',
                                        lineHeight: '1.6'
                                    }}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                </svg>
                                                Live Demo
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3"
                                style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                >Mô Tả</h3>
                                <p className="text-gray-700 leading-relaxed"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    fontStyle: 'italic'
                                }}
                                >{selectedProject.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3"
                                style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                >Công Nghệ Sử Dụng</h3>
                                <div className="space-y-3">
                                    {selectedProject.technologies.map((tech, index) => (
                                        <div key={index}>
                                            <h4 className="font-medium text-gray-800 mb-2"
                                             style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                            >{tech.category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {tech.items.map((item, itemIndex) => (
                                                    <span key={itemIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                     style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedProject.main_features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >Tính Năng Chính</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {selectedProject.main_features.map((feature, index) => (
                                            <li key={index} style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProject.responsibilities.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >Trách Nhiệm</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {selectedProject.responsibilities.map((responsibility, index) => (
                                            <li key={index} style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}>{responsibility}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProject.achievements.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        fontStyle: 'normal'
                                    }}
                                    >Thành Tựu</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {selectedProject.achievements.map((achievement, index) => (
                                            <li key={index} style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        fontStyle: 'normal'
                                    }}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}