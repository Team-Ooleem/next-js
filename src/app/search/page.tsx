'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// components
import BookList from './_components/BookList';
import FilterSidebar from './_components/FilterSidebar';
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
    const initialDisplayTitle = searchParams.get('display_title') ? true : false;
    const initialPublisherName = searchParams.get('publihser_name') ? true : false;
    const initialAuthors = searchParams.get('authors') ? true : false;

    const [sort, setSort] = useState(initialSort);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [display_title , setDisplay_title ] = useState(initialDisplayTitle);
    const [publisher_name , setPublisher_name] = useState(initialPublisherName);
    const [authors, setAuthors] = useState(initialAuthors);

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const page = searchParams.get('page') || 1;
      
        const params = new URLSearchParams();
        params.set('keyword', keyword);
        params.set('page', String(page));
        params.set('sort', sort);
        params.set('len', String(pageSize));
      
        console.log("hi");

        // 체크된 경우에만 추가
        if (display_title) {
          params.set('display_title', keyword);
        } else {
          params.delete('display_title');
        }
      
        if (publisher_name) {
          params.set('publisher_name', keyword);
        } else {
          params.delete('publisher_name');
        }
      
        if (authors) {
          params.set('authors', keyword);
        } else {
          params.delete('authors');
        }
      
        router.replace(`/search?${params.toString()}`);
      }, [sort, pageSize, display_title, publisher_name, authors]);

    return (
        // <div className='p-6'>
        //     <SortAndFilter
        //         sort={sort}
        //         onChangeSort={setSort}
        //         pageSize={pageSize}
        //         onChangePageSize={setPageSize}
        //     />
        //     <BookList sort={sort} pageSize={pageSize} />
        // </div>
        <div className="p-6 flex">
        {/* 왼쪽 사이드 필터 */}
        <div className="w-1/4 pr-4">
          <FilterSidebar
            display_title = {display_title}
            setDisplay_title = {setDisplay_title}
            publisher_name = {publisher_name}
            setPublisher_name = {setPublisher_name}
            authors = {authors}
            setAuthors = {setAuthors}
          />
        </div>
  
        {/* 오른쪽 결과 영역 */}
        <div className="w-3/4">
          <SortAndFilter
            sort={sort}
            onChangeSort={setSort}
            pageSize={pageSize}
            onChangePageSize={setPageSize}
          />
          <BookList sort={sort} pageSize={pageSize} />
        </div>
      </div>
    );
}