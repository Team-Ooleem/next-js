'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='w-full bg-white border-t border-gray-200'>
            {/* 메인 푸터 콘텐츠 */}
            <div className='py-6'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0'>
                        {/* 왼쪽 - 로고 및 기본 정보 */}
                        <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-8'>
                            <Image src='/logo_book.svg' alt='kyobo' width={100} height={36} />

                            {/* 간단한 회사 정보 */}
                            <div className='text-sm text-gray-600'>
                                <p>대표이사: 허정도 | 서울특별시 종로구 종로 1</p>
                                <p>사업자등록번호: 102-81-11670 | 대표전화: 1544-1900</p>
                            </div>
                        </div>

                        {/* 오른쪽 - 링크 및 소셜 */}
                        <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-6'>
                            {/* 네비게이션 링크 */}
                            <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
                                <Link href='#' className='hover:text-gray-900'>
                                    회사소개
                                </Link>
                                <span className='text-gray-300'>|</span>
                                <Link href='#' className='hover:text-gray-900'>
                                    이용약관
                                </Link>
                                <span className='text-gray-300'>|</span>
                                <Link href='#' className='underline hover:text-gray-900'>
                                    개인정보처리방침
                                </Link>
                                <span className='text-gray-300'>|</span>
                                <Link href='#' className='hover:text-gray-900'>
                                    청소년보호정책
                                </Link>
                            </div>

                            {/* 소셜 미디어 및 패밀리사이트 */}
                            <div className='flex items-center space-x-3'>
                                <button className='px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50'>
                                    Family Site ▼
                                </button>
                                <div className='flex space-x-2'>
                                    <button className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300'>
                                        <svg
                                            className='w-3 h-3'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M8 5v10l8-5-8-5z' />
                                        </svg>
                                    </button>
                                    <button className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300'>
                                        <span className='text-xs font-bold'>f</span>
                                    </button>
                                    <button className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300'>
                                        <svg
                                            className='w-3 h-3'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                                            <path
                                                fillRule='evenodd'
                                                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 저작권 정보 */}
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                        <p className='text-sm text-gray-500 text-center'>© KYOBO BOOK CENTRE</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
