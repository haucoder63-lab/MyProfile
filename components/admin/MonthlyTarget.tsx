"use client";

export default function MonthlyTarget() {
    const targetPercentage = 75.55;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (targetPercentage / 100) * circumference;

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Mục Tiêu Hàng Tháng</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Mục tiêu bạn đã đặt cho mỗi tháng</p>
            
            <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{targetPercentage}%</div>
                            <div className="text-xs text-gray-500">+10%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center mb-4">
                Bạn kiếm được $3,287 hôm nay. Cao hơn tháng trước.<br />
                Hãy tiếp tục công việc tốt!
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Mục Tiêu</p>
                    <p className="text-sm font-semibold text-gray-900">$20K</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Doanh Thu</p>
                    <p className="text-sm font-semibold text-gray-900">$30K</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Hôm Nay</p>
                    <p className="text-sm font-semibold text-gray-900">$20K</p>
                </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Hàng Tháng</span>
                <span>Hàng Quý</span>
                <span>Hàng Năm</span>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>06/01 đến 12/01</span>
                </div>
            </div>
        </div>
    );
}