"use client";

export default function Statistics() {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Thống Kê</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Mục tiêu bạn đã đặt cho mỗi tháng</p>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Máy Tính</span>
                    <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">65%</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Máy Tính Bảng</span>
                    <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">34%</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Di Động</span>
                    <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">45%</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Không Xác Định</span>
                    <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">12%</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Hàng Tháng</span>
                    <span>Hàng Quý</span>
                    <span>Hàng Năm</span>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>06/01 đến 12/01</span>
                    </div>
                </div>
            </div>
        </div>
    );
}