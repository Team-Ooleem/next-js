'use client';

import React from 'react';

const SideBar: React.FC = () => {
    return (
        <aside className='fixed right-8 top-1/2 transform -translate-y-1/2 w-20 bg-gradient-to-b from-blue-50 to-purple-50 shadow-lg rounded-full p-4 z-50'>
            {/* 교보문고 로고 */}
            <div className='mb-6 text-center'>
                <div className='text-blue-600 text-lg mb-1'>📚</div>
                <div className='text-xs text-blue-600 font-medium leading-tight'>교보문고</div>
            </div>

            {/* 간단한 베스트셀러 */}
            <section className='mb-6 text-center'>
                <div className='text-red-500 text-lg mb-1'>🔥</div>
                <div className='text-xs text-red-600 font-medium mb-2 leading-tight'>베스트</div>
            </section>

            {/* 간단한 카테고리 */}
            <section className='mb-6 text-center'>
                <div className='text-gray-600 text-lg mb-1'>📂</div>
                <div className='text-xs text-gray-600 font-medium mb-2 leading-tight'>카테고리</div>
            </section>

            {/* 작은 이벤트 배너 */}
            <div className='bg-gradient-to-r from-pink-100 to-purple-100 rounded-full p-3 text-center'>
                <div className='text-pink-600 text-lg mb-1'>🎉</div>
                <div className='text-xs text-pink-700 font-medium leading-tight'>할인</div>
            </div>
        </aside>
    );
};

export default SideBar;
