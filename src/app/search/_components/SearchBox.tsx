'use client';

import { useState } from 'react';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'author'>('title');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'title' | 'author');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 검색 로직 구현
        console.log('검색 타입:', searchType === 'title' ? '책 제목' : '저자');
        console.log('검색어:', keyword);
    };

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto'>
            <div className='relative'>
                <div className='flex items-center bg-white border border-gray-300 rounded-4xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'>
                    <select
                        name='searchType'
                        value={searchType}
                        onChange={handleSearchTypeChange}
                        className='px-3 py-3 text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer'
                        aria-label='검색 타입 선택'
                    >
                        <option value='title'>책 제목</option>
                        <option value='author'>저자</option>
                    </select>
                    <div className='w-px h-6 bg-gray-300 mx-2'></div>
                    <input
                        name='keyword'
                        type='text'
                        value={keyword}
                        onChange={handleChange}
                        placeholder={
                            searchType === 'title'
                                ? '책 제목을 입력해주세요.'
                                : '저자명을 입력해주세요.'
                        }
                        className='flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0'
                        aria-label='검색어 입력'
                    />
                    <button
                        type='submit'
                        className='px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200'
                        aria-label='검색하기'
                    >
                        <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBox;
