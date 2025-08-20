import type { Metadata } from 'next';

import BookList from './_components/BookList';

export const metadata: Metadata = {
    title: '교보문고 검색',
    description: '교보문고 검색 페이지',
};

export default function SearchPage() {
    return (
        <div className='p-6'>
            <BookList />
        </div>
    );
}
