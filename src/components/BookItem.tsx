// components/BookItem.tsx
// [정적] 교보 리스트형

export type Card = {
    edition_id: number;
    cover_image_url: string;
    display_title: string; // "[eBook] 리액트"
    subtitle?: string | null; // 부제(없으면 숨김)
    market_label: string; // "국내도서" (표시용은 제목에 이미 붙어있어 별도 노출 X)
    publisher_name: string; // "서른세계의 계단"
    release_ko: string; // "2020년 06월 01일" (문자 그대로 표시)
    authors?: string; // "네빌고다드"
    translators?: string; // "이상민"
    list_price: number; // 정가 or 표시가
    // 선택 항목(없으면 자동 숨김)
    coupon_rate?: number; // 0.1 => 10%
    coupon_price?: number; // 7650
    rating_score?: number; // 9.93
    rating_count?: number; // 25
    like_count?: number; // 121
    tags?: string[]; // ["자기계발", ...]
};

function krw(n?: number) {
    if (typeof n !== 'number' || Number.isNaN(n)) return '-';
    return new Intl.NumberFormat('ko-KR').format(n);
}

export default function Book_Item({ d }: { d: Card }) {
    const img = d.cover_image_url || '/placeholder.png';
    const hasCoupon = typeof d.coupon_rate === 'number' && d.coupon_rate! > 0;
    const couponPct = hasCoupon ? Math.round(d.coupon_rate! * 100) : 0;
    const couponPrice = hasCoupon
        ? typeof d.coupon_price === 'number'
            ? d.coupon_price!
            : Math.round(d.list_price * (1 - d.coupon_rate!))
        : d.list_price;

    return (
        <li className='prod_item'>
            <article className='flex items-start gap-5 p-4 border-b'>
                {/* 좌: 표지 */}
                <div className='relative w-28 h-40 shrink-0'>
                    <img
                        src={img}
                        alt={d.display_title || '표지'}
                        className='w-full h-full object-cover rounded-md border'
                        loading='lazy'
                        referrerPolicy='no-referrer'
                    />
                </div>

                {/* 가운데: 본문 */}
                <div className='flex-1 min-w-0'>
                    {/* 제목(이미 [eBook] 포함) */}
                    <h3 className='text-[20px] font-semibold leading-snug break-keep'>
                        {d.display_title || '(제목 없음)'}
                    </h3>

                    {/* 부제 */}
                    {d.subtitle && (
                        <p className='mt-1 text-sm text-gray-700 break-keep'>{d.subtitle}</p>
                    )}

                    {/* 저자/역자 */}
                    {(d.authors || d.translators) && (
                        <p className='mt-1 text-sm text-gray-800'>
                            {d.authors && <span>{d.authors} 저자(글)</span>}
                            {d.authors && d.translators && (
                                <span className='text-gray-500'> · </span>
                            )}
                            {d.translators && (
                                <span className='text-gray-600'>{d.translators} 번역</span>
                            )}
                        </p>
                    )}

                    {/* 출판사 · 날짜 (release_ko 그대로) */}
                    <p className='mt-1 text-sm text-gray-600'>
                        {d.publisher_name}
                        {d.release_ko && <span> · {d.release_ko}</span>}
                    </p>

                    {/* 쿠폰/가격 라인 */}
                    <div className='mt-3 flex items-center gap-2 text-sm'>
                        {hasCoupon ? (
                            <>
                                <span className='text-gray-700'>쿠폰적용가</span>
                                <span className='text-gray-500'>{couponPct}%</span>
                                <span className='text-gray-900 font-semibold'>
                                    {krw(couponPrice)}원
                                </span>
                                <span className='inline-flex items-center rounded px-2 py-1 text-xs bg-indigo-600 text-white select-none'>
                                    할인쿠폰
                                </span>
                            </>
                        ) : (
                            <span className='text-xl font-bold'>{krw(d.list_price)}원</span>
                        )}
                    </div>

                    {/* 평점/추천(선택) */}
                    {(typeof d.rating_score === 'number' || typeof d.rating_count === 'number') && (
                        <div className='mt-2 flex items-center gap-2 text-sm'>
                            <span className='inline-block w-2 h-2 rounded-full bg-green-600' />
                            {typeof d.rating_score === 'number' && (
                                <span className='font-semibold'>{d.rating_score.toFixed(2)}</span>
                            )}
                            {typeof d.rating_count === 'number' && (
                                <span className='text-gray-600'>({d.rating_count})</span>
                            )}
                            <span className='text-gray-500'>추천해요</span>
                        </div>
                    )}

                    {/* 태그(선택) */}
                    {d.tags && d.tags.length > 0 && (
                        <div className='mt-3 flex flex-wrap gap-2'>
                            {d.tags.slice(0, 8).map((t, i) => (
                                <span
                                    key={`${t}-${i}`}
                                    className='inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700'
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 우: 하트/버튼(정적) */}
                <div className='shrink-0 flex flex-col items-end gap-2 min-w-[96px]'>
                    <div className='flex items-center gap-1 text-gray-500'>
                        <span>♡</span>
                        <span className='text-sm'>{d.like_count ?? 0}</span>
                    </div>
                    <div className='w-24 rounded-md bg-gray-700 text-white py-2 text-center text-sm select-none'>
                        장바구니
                    </div>
                    <div className='w-24 rounded-md bg-indigo-700 text-white py-2 text-center text-sm select-none'>
                        바로구매
                    </div>
                </div>
            </article>
        </li>
    );
}
