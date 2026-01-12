"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes, FaUsers, FaCalendarAlt, FaCode, FaStar, FaTasks, FaTrophy } from "react-icons/fa";
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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchProjects();
        
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (projects.length > 0) {
                setCurrentSlide((prev) => (prev + 1) % Math.ceil(projects.length / 3));
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [projects.length]);

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
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { 
            month: '2-digit', 
            year: 'numeric' 
        }).replace('tháng ', '').replace(', ', '/');
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(projects.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(projects.length / 3)) % Math.ceil(projects.length / 3));
    };

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const getVisibleProjects = () => {
        const startIndex = currentSlide * 3;
        return projects.slice(startIndex, startIndex + 3);
    };

    return (
        <div 
            ref={sectionRef}
            className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-2 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative max-w-screen-2xl mx-auto px-4">
                <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 
                        className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '36px',
                            fontWeight: '700'
                        }}
                    >
                        Dự Án Nổi Bật
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
                        Khám phá những dự án công nghệ hiện đại tôi đã thực hiện
                    </p>
                </div>

                {projects.length > 0 && (
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex-shrink-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                                            {projects.slice(slideIndex * 3, slideIndex * 3 + 3).map((project, index) => (
                                                <div 
                                                    key={project._id}
                                                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                                    style={{ 
                                                        animationDelay: `${index * 200}ms`,
                                                        minHeight: '520px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    
                                                    <div className="relative h-52 overflow-hidden">
                                                        {project.image_url && project.image_url.trim() !== "" && isValidUrl(project.image_url) ? (
                                                            project.image_url.startsWith('/') ? (
                                                                <img
                                                                    src={project.image_url}
                                                                    alt={project.title}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                    style={{
                                                                        objectFit: 'cover',
                                                                        objectPosition: 'center'
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src={project.image_url}
                                                                    alt={project.title}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                    style={{
                                                                        objectFit: 'cover',
                                                                        objectPosition: 'center'
                                                                    }}
                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                    quality={90}
                                                                />
                                                            )
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                                <FaCode className="text-4xl text-blue-400" />
                                                            </div>
                                                        )}
                                                        
                                                        <div className="absolute top-3 left-3">
                                                            <span 
                                                                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-sm"
                                                                style={{
                                                                    fontFamily: 'Roboto',
                                                                    fontSize: '14px',
                                                                    fontWeight: '500'
                                                                }}
                                                            >
                                                                {project.project_type === 'academic' ? 'Học tập' : 'Chuyên nghiệp'}
                                                            </span>
                                                        </div>
                                                        
                                                        {project.grade && (
                                                            <div className="absolute top-3 right-3">
                                                                <span 
                                                                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-sm flex items-center gap-1"
                                                                    style={{
                                                                        fontFamily: 'Roboto',
                                                                        fontSize: '14px',
                                                                        fontWeight: '600'
                                                                    }}
                                                                >
                                                                    <FaStar className="text-xs" />
                                                                    {project.grade}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-6 relative">
                                                        <div className="mb-4">
                                                            <h3 
                                                                className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors group-hover:text-blue-600"
                                                                onClick={() => openModal(project)}
                                                                style={{
                                                                    fontFamily: 'Roboto',
                                                                    fontSize: '20px',
                                                                    fontWeight: '700',
                                                                    fontStyle: 'normal'
                                                                }}
                                                            >
                                                                {project.title}
                                                            </h3>
                                                            <p 
                                                                className="text-blue-600 font-semibold flex items-center gap-2"
                                                                style={{
                                                                    fontFamily: 'Roboto',
                                                                    fontSize: '18px',
                                                                    fontWeight: '600',
                                                                    fontStyle: 'normal'
                                                                }}
                                                            >
                                                                <FaCode className="text-sm" />
                                                                {project.role}
                                                            </p>
                                                        </div>

                                                        <p 
                                                            className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
                                                            style={{
                                                                fontFamily: 'Roboto',
                                                                fontSize: '17px',
                                                                fontWeight: '400',
                                                                fontStyle: 'italic'
                                                            }}
                                                        >
                                                            {project.description}
                                                        </p>

                                                        <div className="mb-4 space-y-2">
                                                            <div className="flex items-center text-sm text-gray-500 gap-4">
                                                                <span 
                                                                    className="flex items-center gap-1"
                                                                    style={{
                                                                        fontFamily: 'Roboto',
                                                                        fontSize: '16px',
                                                                        fontWeight: '400',
                                                                        fontStyle: 'normal'
                                                                    }}
                                                                >
                                                                    <FaCalendarAlt className="text-xs" />
                                                                    {formatDate(project.start_date)} - {formatDate(project.end_date)}
                                                                </span>
                                                                <span 
                                                                    className="flex items-center gap-1"
                                                                    style={{
                                                                        fontFamily: 'Roboto',
                                                                        fontSize: '16px',
                                                                        fontWeight: '400',
                                                                        fontStyle: 'normal'
                                                                    }}
                                                                >
                                                                    <FaUsers className="text-xs" />
                                                                    {project.team_size} thành viên
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex flex-wrap gap-1">
                                                                {project.technologies.slice(0, 1).map((tech) => (
                                                                    tech.items.slice(0, 3).map((item, index) => (
                                                                        <span 
                                                                            key={index} 
                                                                            className="px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-xs border border-blue-100"
                                                                            style={{
                                                                                fontFamily: 'Roboto',
                                                                                fontSize: '13px',
                                                                                fontWeight: '500'
                                                                            }}
                                                                        >
                                                                            {item}
                                                                        </span>
                                                                    ))
                                                                ))}
                                                                {project.technologies.length > 1 && (
                                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                                                        +{project.technologies.slice(1).reduce((acc, tech) => acc + tech.items.length, 0)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                            <div className="flex space-x-2">
                                                                {project.github_url && (
                                                                    <Link
                                                                        href={project.github_url} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-sm"
                                                                        style={{
                                                                            fontFamily: 'Roboto',
                                                                            fontSize: '16px',
                                                                            fontWeight: '500',
                                                                            textDecoration: 'none'
                                                                        }}
                                                                    >
                                                                        <FaGithub className="mr-1" />
                                                                        GitHub
                                                                    </Link>
                                                                )}
                                                                {project.demo_url && (
                                                                    <Link
                                                                        href={project.demo_url} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-sm"
                                                                        style={{
                                                                            fontFamily: 'Roboto',
                                                                            fontSize: '16px',
                                                                            fontWeight: '500',
                                                                            textDecoration: 'none'
                                                                        }}
                                                                    >
                                                                        <FaExternalLinkAlt className="mr-1" />
                                                                        Demo
                                                                    </Link>
                                                                )}
                                                            </div>
                                                            <span 
                                                                className={`text-xs font-medium px-2 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                                                                style={{
                                                                    fontFamily: 'Roboto',
                                                                    fontSize: '16px',
                                                                    fontWeight: '500'
                                                                }}
                                                            >
                                                                {project.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {Math.ceil(projects.length / 3) > 1 && (
                            <>
                                <Button
                                    onClick={prevSlide}
                                    className="absolute bg-transparent left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
                                >
                                    <FaChevronLeft className="text-gray-600" />
                                </Button>
                                
                                <Button
                                    onClick={nextSlide}
                                    className="absolute bg-transparent right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
                                >
                                    <FaChevronRight className="text-gray-600" />
                                </Button>

                                <div className="flex justify-center mt-6 space-x-2">
                                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                currentSlide === index 
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {projects.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <FaCode className="text-3xl text-blue-400" />
                        </div>
                        <h3 
                            className="text-xl font-semibold text-gray-900 mb-2"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                                fontWeight: '600'
                            }}
                        >
                            Chưa có dự án
                        </h3>
                        <p 
                            className="text-gray-500"
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                fontWeight: '400'
                            }}
                        >
                            Các dự án sẽ được hiển thị tại đây.
                        </p>
                    </div>
                )}
            </div>

            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
                        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 
                                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '22px',
                                    fontWeight: '700'
                                }}
                            >
                                {selectedProject.title}
                            </h2>
                            <Button
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            >
                                <FaTimes className="text-xl" />
                            </Button>
                        </div>

                        <div className="p-6">
                            {selectedProject.image_url && selectedProject.image_url.trim() !== "" && isValidUrl(selectedProject.image_url) && (
                                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                    {selectedProject.image_url.startsWith('/') ? (
                                        <img
                                            src={selectedProject.image_url}
                                            alt={selectedProject.title}
                                            className="w-full h-64 object-cover"
                                        />
                                    ) : (
                                        <div className="relative w-full h-64">
                                            <Image
                                                src={selectedProject.image_url}
                                                alt={selectedProject.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaTasks className="text-blue-500" />
                                        Thông Tin Dự Án
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <FaCode className="text-blue-500 text-sm" />
                                            <span 
                                                className="font-semibold text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Vai trò:
                                            </span>
                                            <span 
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {selectedProject.role}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTasks className="text-purple-500 text-sm" />
                                            <span 
                                                className="font-semibold text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Loại dự án:
                                            </span>
                                            <span 
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {selectedProject.project_type === 'academic' ? 'Học tập' : 'Chuyên nghiệp'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-green-500 text-sm" />
                                            <span 
                                                className="font-semibold text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Số thành viên:
                                            </span>
                                            <span 
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {selectedProject.team_size}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-orange-500 text-sm" />
                                            <span 
                                                className="font-semibold text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Thời gian:
                                            </span>
                                            <span 
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {formatDate(selectedProject.start_date)} - {formatDate(selectedProject.end_date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            <span 
                                                className="font-semibold text-gray-700"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Trạng thái:
                                            </span>
                                            <span 
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                {selectedProject.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                                            </span>
                                        </div>
                                        {selectedProject.grade && (
                                            <div className="flex items-center gap-2">
                                                <FaStar className="text-yellow-500 text-sm" />
                                                <span 
                                                    className="font-semibold text-gray-700"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    Điểm:
                                                </span>
                                                <span 
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    {selectedProject.grade}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaExternalLinkAlt className="text-green-500" />
                                        Liên Kết
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedProject.github_url && (
                                            <Link
                                                href={selectedProject.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '18px',
                                                    fontStyle: 'normal',
                                                    fontWeight: '500',
                                                    textDecoration: 'none'
                                                }}
                                                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300"
                                            >
                                                <FaGithub className="text-xl text-gray-800" />
                                                <span 
                                                    className="font-medium text-gray-800"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    GitHub Repository
                                                </span>
                                            </Link>
                                        )}
                                        {selectedProject.demo_url && (
                                            <Link
                                                href={selectedProject.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '18px',
                                                    fontStyle: 'normal',
                                                    fontWeight: '500',
                                                    textDecoration: 'none'
                                                }}
                                                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300"
                                            >
                                                <FaExternalLinkAlt className="text-xl text-blue-600" />
                                                <span 
                                                    className="font-medium text-blue-600"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Live Demo
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 
                                    className="text-xl font-bold text-gray-900 mb-4"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '700'
                                    }}
                                >
                                    Mô Tả Dự Án
                                </h3>
                                <p 
                                    className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '15px',
                                        fontWeight: '400',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 
                                    className="text-xl font-bold text-gray-900 mb-4"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '18px',
                                        fontWeight: '700'
                                    }}
                                >
                                    Công Nghệ Sử Dụng
                                </h3>
                                <div className="space-y-4">
                                    {selectedProject.technologies.map((tech, index) => (
                                        <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                                            <h4 
                                                className="font-bold text-gray-800 mb-3"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {tech.category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {tech.items.map((item, itemIndex) => (
                                                    <span 
                                                        key={itemIndex} 
                                                        className="px-3 py-2 bg-white text-blue-800 rounded-lg text-sm font-medium shadow-sm border border-blue-200"
                                                        style={{
                                                            fontFamily: 'Roboto',
                                                            fontSize: '13px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedProject.main_features.length > 0 && (
                                <div className="mb-8">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaStar className="text-yellow-500" />
                                        Tính Năng Chính
                                    </h3>
                                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                        <ul className="space-y-2">
                                            {selectedProject.main_features.map((feature, index) => (
                                                <li 
                                                    key={index} 
                                                    className="flex items-start gap-2 text-gray-700"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    <span className="text-yellow-500 mt-1">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {selectedProject.responsibilities.length > 0 && (
                                <div className="mb-8">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaTasks className="text-blue-500" />
                                        Trách Nhiệm
                                    </h3>
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                        <ul className="space-y-2">
                                            {selectedProject.responsibilities.map((responsibility, index) => (
                                                <li 
                                                    key={index} 
                                                    className="flex items-start gap-2 text-gray-700"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    {responsibility}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {selectedProject.achievements.length > 0 && (
                                <div className="mb-8">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        <FaTrophy className="text-green-500" />
                                        Thành Tựu
                                    </h3>
                                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                        <ul className="space-y-2">
                                            {selectedProject.achievements.map((achievement, index) => (
                                                <li 
                                                    key={index} 
                                                    className="flex items-start gap-2 text-gray-700"
                                                    style={{
                                                        fontFamily: 'Roboto',
                                                        fontSize: '14px',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    <span className="text-green-500 mt-1">•</span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}