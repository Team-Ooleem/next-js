'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// components
import SearchBox from './searchbox/SearchBox';

const Header: React.FC = () => {
    return (
        <header className='w-full bg-white shadow-sm sticky top-0 z-50'>
            {/* Main Category Navigation Tabs & Top Utility Navigation Bar Container */}
            <div className='bg-gray-50'>
                <div className='flex items-stretch justify-center'>
                    {/* Main Category Navigation Tabs */}
                    <div>
                        <div className='h-full flex items-center px-4'>
                            <div className='flex items-center space-x-0'>
                                {/* 교보문고 탭 - 활성화된 상태 */}
                                <div className='relative'>
                                    <div
                                        className='bg-blue-800 text-white px-4 py-2 rounded-l-lg font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        교보문고
                                    </div>
                                </div>

                                {/* eBook 탭 */}
                                <div className='relative -ml-2'>
                                    <div
                                        className='bg-blue-500 text-white px-4 py-2 font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        eBook
                                    </div>
                                </div>

                                {/* sam 탭 */}
                                <div className='relative -ml-2'>
                                    <div
                                        className='bg-teal-500 text-white px-4 py-2 font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        sam
                                    </div>
                                </div>

                                {/* 핫트랙스 탭 */}
                                <div className='relative -ml-2'>
                                    <div
                                        className='bg-red-500 text-white px-4 py-2 font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        핫트랙스
                                    </div>
                                </div>

                                {/* 스토리 탭 */}
                                <div className='relative -ml-2'>
                                    <div
                                        className='bg-gray-200 text-gray-700 px-4 py-2 font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        스토리
                                    </div>
                                </div>

                                {/* 브랜드 더보기 탭 */}
                                <div className='relative -ml-2'>
                                    <div
                                        className='bg-gray-200 text-gray-700 px-4 py-2 font-medium cursor-pointer text-sm'
                                        style={{
                                            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
                                        }}
                                    >
                                        <div className='flex items-center'>
                                            브랜드 더보기
                                            <svg
                                                className='w-2.5 h-2.5 ml-1'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Utility Navigation Bar */}
                    <div>
                        <div className='h-full flex items-center justify-end px-4'>
                            <nav className='flex items-center space-x-3'>
                                <Link
                                    href='/signup'
                                    className='text-gray-600 hover:text-gray-900 text-xs'
                                >
                                    회원가입
                                </Link>
                                <div className='w-px h-3 bg-gray-300'></div>
                                <Link
                                    href='/login'
                                    className='text-gray-600 hover:text-gray-900 text-xs'
                                >
                                    로그인
                                </Link>
                                <div className='w-px h-3 bg-gray-300'></div>
                                <div className='flex items-center text-gray-600 hover:text-gray-900 cursor-pointer text-xs'>
                                    회원혜택
                                    <svg
                                        className='w-2.5 h-2.5 ml-1'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </div>
                                <div className='w-px h-3 bg-gray-300'></div>
                                <Link
                                    href='/order'
                                    className='text-gray-600 hover:text-gray-900 text-xs'
                                >
                                    주문배송
                                </Link>
                                <div className='w-px h-3 bg-gray-300'></div>
                                <Link
                                    href='/store'
                                    className='text-gray-600 hover:text-gray-900 text-xs'
                                >
                                    매장안내
                                </Link>
                                <div className='w-px h-3 bg-gray-300'></div>
                                <Link
                                    href='/support'
                                    className='text-gray-600 hover:text-gray-900 text-xs'
                                >
                                    고객센터
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header Content Area */}
            <div className='bg-white shadow-sm'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex items-center justify-between h-16'>
                        {/* Left Section - Hamburger Menu & Logo */}
                        <div className='flex items-center space-x-4'>
                            <button className='w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors'>
                                <svg
                                    className='w-4 h-4 text-gray-600'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            </button>

                            <Image src='/logo_book.svg' alt='kyobo' width={120} height={44} />
                        </div>

                        {/* Center Section - Search Bar */}
                        <SearchBox />

                        {/* Right Section - Cart & User Profile */}
                        <div className='flex items-center space-x-3'>
                            <Link
                                href='/cart'
                                className='w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors'
                            >
                                <svg
                                    className='w-4 h-4 text-gray-700'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                    />
                                </svg>
                            </Link>

                            <button className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors'>
                                <svg
                                    className='w-4 h-4 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
