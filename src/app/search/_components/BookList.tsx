'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import BookItem, { type Card } from '@/components/BookItem';
import Pagination from '@/components/pagination';

// local functions
// 예시: API 결과 r -> Card
function toCard(r: any): Card {
    return {
        edition_id: r.edition_id,
        cover_image_url: r.cover_image_url,
        display_title: r.display_title,
        subtitle: r.subtitle ?? null,
        market_label: r.market_label,
        authors: r.authors,
        translators: r.translators ?? '',
        publisher_name: r.publisher_name,
        release_ko: r.release_ko,
        list_price: Number(r.list_price ?? 0),
        like_count: r.like_count ?? 0,
    };
}

// API 요청 함수
const fetchBooks = async (keyword: string, page: number) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}search`, {
        params: {
            keyword: keyword,
            page: page,
        },
    });
    return res.data;
};

export default function BookList() {
    const searchParams: URLSearchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get('page') || 1);
    const keyword = searchParams.get('keyword') || '';

    // TanStack Query를 사용하여 데이터 가져오기
    const { data, isLoading, error } = useQuery({
        queryKey: ['books', keyword, currentPage],
        queryFn: () => fetchBooks(keyword, currentPage),
    });

    const handlePageChange = (newPage: number) => {
        router.push(`?keyword=${keyword}&page=${newPage}`);
    };

    const books = data?.books || [];
    const total = data?.totalCount || 0;
    const totalPages = data?.totalPages || 1;

    return (
        <>
            <h1 className='text-2xl font-bold mt-12 mb-12'>
                <span style={{ color: '#3c9a17' }}>{keyword ? `${keyword}에 대한` : '전체'}</span>{' '}
                <span className='text-black'>{total}</span>개의 검색 결과
            </h1>
            <div className='gap-4'>
                {books.map((book: any) => (
                    <BookItem key={book.edition_id} card={toCard(book)} />
                ))}
            </div>

            <div className='mt-6'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}
