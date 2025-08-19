'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookItem, { type Card } from '../../components/BookItem';
import Pagination from '../../components/pagination';
interface searchParams {
    keyword?: string;
    page?: string;
    len?: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
}

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

export default function SearchPage({ keyword = '' }: searchParams) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [books, setBooks] = useState<Card[]>([]);
    //const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    //const keyword = searchParams.keyword || '';
    const currentPage = Number(searchParams.get('page') || 1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(
                    `http://localhost:4000/search?keyword=${keyword}&page=${currentPage}`,
                ); // 이 부분은 기능 구현되는 대로 훨씬 많은 뭔가뭔가가 들어올수 있음
                const data = await res.json();
                //console.log(data);
                setBooks(data.books);
                setTotal(data.totalCount);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error('Failed to fetch books:', err);
            }
        };
        fetchBooks();
    }, [keyword, currentPage]);

    const handlePageChange = (newPage: number) => {
        router.push(`?keyword=${keyword}&page=${newPage}`);
    };

    return (
        <div className='p-6'>
            <h1 className='text-xl font-bold mb-4'>
                {`'${keyword}'에 대한 ${total}개의 검색 결과`}
            </h1>
            <div className='grid grid-cols-2 gap-4'>
                {books.map((book) => (
                    <BookItem card={toCard(book)} />
                ))}
            </div>

            <div className='mt-6'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
