// app/cart/_components/CartToolbar.tsx
'use client';

type ViewType = 'all' | 'selected' | 'available' | 'direct';

interface CartToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export default function CartToolbar({ currentView, onViewChange }: CartToolbarProps) {
    return (
        <div className='flex items-center justify-between p-4 border-b'>
            <div className='flex items-center space-x-2'>
                <select
                    value={currentView}
                    onChange={(e) => onViewChange(e.target.value as ViewType)}
                    className='text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                    <option value='all'>전체</option>
                    <option value='selected'>선택된 상품</option>
                    <option value='available'>재고 있음</option>
                </select>
            </div>
            <div className='flex items-center space-x-2'>
                <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                    ♡
                </button>
                <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                    🗑️
                </button>
                <button className='text-sm text-gray-600 px-3 py-1 border rounded hover:bg-gray-50 transition-colors'>
                    Excel 다운로드
                </button>
                <button className='text-sm text-gray-600 px-3 py-1 border rounded hover:bg-gray-50 transition-colors'>
                    찜 보관함 가기
                </button>
                <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                    ⋯
                </button>
            </div>
        </div>
    );
}
