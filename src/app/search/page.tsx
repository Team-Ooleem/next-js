'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// components
import BookList from './_components/BookList';
import SortAndFilter from './_components/SortAndFilter';

// "use client" 사용 위해 임시 주석처리
// export const metadata: Metadata = {
//     title: 'Search',
//     description: 'Search for books',
// };

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL 파라미터 초기값 가져오기
    const initialSort =
        (searchParams.get('sort') as 'latest' | 'title' | 'price_asc' | 'price_desc') || 'latest';
    const initialPageSize = (Number(searchParams.get('len')) as 3 | 5 | 10 | 20) || 20;

    const [sort, setSort] = useState(initialSort);
    const [pageSize, setPageSize] = useState(initialPageSize);

    // sort, pageSize 변경되면 URL 업데이트
    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const page = searchParams.get('page') || 1;
        router.push(`?keyword=${keyword}&page=${page}&sort=${sort}&len=${pageSize}`);
    }, [sort, pageSize]);

    return (
        <div className='p-6'>
            <SortAndFilter
                sort={sort}
                onChangeSort={setSort}
                pageSize={pageSize}
                onChangePageSize={setPageSize}
            />
            <BookList sort={sort} pageSize={pageSize} />
        </div>
    );
}
