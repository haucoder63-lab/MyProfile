"use client";

export default function MonthlySales() {
    const salesData = [
        { month: 'Jan', value: 200 },
        { month: 'Feb', value: 150 },
        { month: 'Mar', value: 300 },
        { month: 'Apr', value: 250 },
        { month: 'May', value: 180 },
        { month: 'Jun', value: 220 },
        { month: 'Jul', value: 350 },
        { month: 'Aug', value: 280 },
        { month: 'Sep', value: 320 },
        { month: 'Oct', value: 400 },
        { month: 'Nov', value: 300 },
        { month: 'Dec', value: 250 }
    ];

    const maxValue = Math.max(...salesData.map(d => d.value));

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Doanh Số Hàng Tháng</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>

            <div className="mb-4">
                <div className="flex items-end justify-between h-64 space-x-2">
                    {salesData.map((data, index) => (
                        <div key={data.month} className="flex flex-col items-center flex-1">
                            <div 
                                className="w-full bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-blue-600"
                                style={{ 
                                    height: `${(data.value / maxValue) * 200}px`,
                                    minHeight: '20px'
                                }}
                            />
                            <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                    <span>0</span>
                    <span>100</span>
                    <span>200</span>
                    <span>300</span>
                    <span>400</span>
                </div>
            </div>
        </div>
    );
}