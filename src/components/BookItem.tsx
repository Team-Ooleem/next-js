// components/BookItem.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';

export type Card = {
    edition_id: number;
    cover_image_url: string;
    display_title: string; // "[eBook] 리액트"
    market_label: string; // "국내도서" (표시용은 제목에 이미 붙어있어 별도 노출 X)
    publisher_name: string; // "서른세계의 계단"
    release_ko: string; // "2020년 06월 01일" (문자 그대로 표시)
    authors: string; // "네빌고다드"
    list_price: number; // 정가 or 표시가
    like_count: number; // 121
    // 선택 항목(없으면 자동 숨김)
    subtitle: string; // 부제(없으면 숨김)
    translators: string; // "이상민"
};
// 가격 포맷 함수s
function formatKRW(value?: number) {
    if (typeof value !== 'number' || Number.isNaN(value)) return '-';
    return new Intl.NumberFormat('ko-KR').format(value);
}

export default function BookItem({ card }: { card: Card }) {
    const [isLiked, setIsLiked] = useState(false);

    const handleHeartclick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <li className='prod_item'>
            {/* ✅ 카드형 스타일 */}
            <article className='flex items-start gap-5 p-4 mb-4 rounded-md border border-gray-200 shadow-sm bg-white'>
                {/* 좌: 썸네일 */}
                <div className='shrink-0 w-28'>
                    <div className='relative w-28 aspect-[2/3] overflow-hidden rounded-md bg-amber-50'>
                        <Image
                            src={card.cover_image_url || '/placeholder.png'}
                            alt={card.display_title}
                            fill
                            sizes='112px'
                            className='object-contain'
                            unoptimized
                        />
                    </div>
                </div>
                {/* 가운데: 본문 */}
                <div className='flex-1 min-w-0'>
                    <h3 className='text-[20px] text-black leading-snug break-keep hover:underline hover:underline-offset-2 hover:decoration-1'>
                        {card.display_title || '(제목 없음)'}
                    </h3>

                    {card.subtitle && (
                        <p className='mt-1 text-sm text-gray-700 break-keep'>{card.subtitle}</p>
                    )}

                    {(card.authors || card.translators) && (
                        <p className='mt-1 text-sm text-gray-500 '>
                            {card.authors && (
                                <span>
                                    <span className='text-black leading-snug break-keep hover:underline hover:underline-offset-2 hover:decoration-1'>
                                        {card.authors}
                                    </span>
                                    저자(글)
                                </span>
                            )}
                            {card.authors && card.translators && (
                                <span className='text-gray-500'> · </span>
                            )}
                            {card.translators && (
                                <span>
                                    <span className='text-black leading-snug break-keep hover:underline hover:underline-offset-2 hover:decoration-1'>
                                        {card.translators}
                                    </span>
                                    번역
                                </span>
                            )}
                        </p>
                    )}
                    <p className='mt-1 text-sm text-gray-600'>
                        <span className='hover:underline cursor-pointer'>
                            {card.publisher_name}
                        </span>
                        {card.release_ko && <span> · {card.release_ko}</span>}
                    </p>

                    {/* 가격 */}
                    <p className='mt-2 text-[15px] font-semibold text-black'>
                        소장 {formatKRW(card.list_price)}원
                    </p>
                </div>
                {/* 우: 하트/버튼 */}
                <div className='shrink-0 flex flex-col items-end gap-2 min-w-[96px]'>
                    <div
                        className='flex items-center gap-1 text-gray-500 cursor-pointer hover:opacity-70 transition-opacity'
                        onClick={handleHeartclick}
                    >
                        <svg
                            className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500 fill-none'} transition-colors duration-200`}
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                        </svg>
                        <span className='text-sm'>
                            {isLiked ? card.like_count + 1 : card.like_count}
                        </span>
                    </div>

                    <div className='w-24 rounded-md bg-gray-500 hover:bg-gray-600 active:bg-gray-900 active:scale-95 text-white py-2 text-center text-sm select-none cursor-pointer transition-all duration-200'>
                        장바구니
                    </div>
                    <div className='w-24 rounded-md bg-indigo-500 hover:bg-indigo-800 active:bg-indigo-900 active:scale-95 text-white py-2 text-center text-sm select-none cursor-pointer transition-all duration-200'>
                        바로구매
                    </div>
                </div>
            </article>
        </li>
    );
}
