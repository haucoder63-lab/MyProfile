"use client";

import { useState, useEffect } from "react";

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

interface Contact {
    _id: string;
    email: string;
    phone: string;
    address: string;
    social_links: SocialLink[];
    availability: string;
    preferred_contact: string;
    user_id: any;
    createdAt: string;
}

export default function Contact() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            if (Array.isArray(data)) {
                setContacts(data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'github':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                    </svg>
                );
            case 'facebook':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                );
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
        <div className="bg-gray-50 py-4">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="text-center mb-1">
                    <h2 className="text-3xl font-medium text-gray-900 mb-3" 
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '30px',
                        fontWeight: '600',
                        fontStyle: 'normal'
                    }}
                    >Liên Hệ</h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto"
                     style={{
                        fontFamily: 'Roboto',
                        fontSize: '22px',
                        fontWeight: '400',
                        fontStyle: 'italic'
                    }}
                    >
                        Thông tin liên hệ và mạng xã hội
                    </p>
                </div>

                {contacts.map((contact) => (
                    <div key={contact._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontWeight: '800',
                                            fontStyle: 'normal'
                                        }}
                                        >Email</h3>
                                        <p className="text-lg text-gray-900"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}
                                        >{contact.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontWeight: '800',
                                            fontStyle: 'normal'
                                        }}
                                        >Điện Thoại</h3>
                                        <p className="text-lg text-gray-900"
                                         style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}
                                        >{contact.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500"
                                      style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            fontWeight: '800',
                                            fontStyle: 'normal'
                                        }}
                                        >Địa Chỉ</h3>
                                        <p className="text-lg text-gray-900"
                                            style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}
                                        >{contact.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        fontStyle: 'normal'
                                    }}
                                    >Mạng Xã Hội</h3>
                                    <div className="flex space-x-4">
                                        {contact.social_links.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                            >
                                                {getSocialIcon(social.platform)}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"
                                   style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        fontStyle: 'normal'
                                    }}
                                    >Thời Gian Liên Hệ</h3>
                                    <p className="text-gray-700"
                                     style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}
                                    >{contact.availability}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"
                                   style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        fontStyle: 'normal'
                                    }}
                                    >Phương Thức Liên Hệ Ưu Tiên</h3>
                                    <p className="text-gray-700"
                                     style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '17px',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}
                                    >{contact.preferred_contact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                        fontWeight: '600',
                        fontStyle: 'normal'
                    }}
                    >Vị Trí</h3>
                    <div className="w-full h-96 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.8234567890123!2d107.3497934!3d16.7109101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141033f2ce5e349%3A0xbd200280e0fc098d!2zxJBhIE5naGksIEjhuqNpIEzEg25nLCBUaMOgbmggcGjhu5EgSHXhur8sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {contacts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có thông tin liên hệ</h3>
                        <p className="text-gray-500">Thông tin liên hệ sẽ được hiển thị tại đây.</p>
                    </div>
                )}
            </div>
        </div>
    );
}