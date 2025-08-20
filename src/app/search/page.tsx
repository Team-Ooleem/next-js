import type { Metadata } from 'next';

import BookList from './_components/BookList';
import SearchBox from './_components/SearchBox';

export const metadata: Metadata = {
    title: 'Search',
    description: 'Search for books',
};

export default function SearchPage() {
    return (
        <div className='p-6'>
            <SearchBox />
            <BookList />
        </div>
    );
}
