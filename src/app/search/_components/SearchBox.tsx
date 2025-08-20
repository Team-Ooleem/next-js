'use client';

import { useRef, useState } from 'react';
import AutoComplete from './AutoComplete';

// types
import { Book } from '../_types/book';

function SearchBox() {
    const [keyword, setKeyword] = useState<string>('');
    const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setKeyword(value);
        setShowAutoComplete(value.trim().length > 0);

        // 선택된 책이 있으면 초기화
        if (selectedBook) {
            setSelectedBook(null);
        }
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (selectedBook) {
            // 선택된 책이 있으면 해당 책으로 검색
            console.log('선택된 책으로 검색:', selectedBook);
        } else {
            // 일반 검색
            console.log('검색 타입:', '책 제목');
            console.log('검색어:', keyword);
        }
        setShowAutoComplete(false);
    };

    const handleBookSelect = (book: Book): void => {
        setSelectedBook(book);
        setKeyword(book.title);
        setShowAutoComplete(false);
        inputRef.current?.focus();
    };

    const handleClearKeyword = (): void => {
        setKeyword('');
        setSelectedBook(null);
        setShowAutoComplete(false);
        inputRef.current?.focus();
    };

    const handleInputFocus = (): void => {
        if (keyword.trim().length > 0) {
            setShowAutoComplete(true);
        }
    };

    const handleCloseAutoComplete = (): void => {
        setShowAutoComplete(false);
    };

    // 검색 타입에 따른 placeholder 동적 변경
    const getPlaceholder = (): string => {
        if (selectedBook) {
            return selectedBook.title;
        }
        return '책 제목을 입력해주세요.';
    };

    return (
        <div className='w-full max-w-2xl mx-auto relative'>
            <form onSubmit={handleSubmit}>
                <div className='relative'>
                    <div className='flex items-center bg-white border border-gray-300 rounded-4xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'>
                        <input
                            ref={inputRef}
                            name='keyword'
                            type='text'
                            value={keyword}
                            onChange={handleChange}
                            onFocus={handleInputFocus}
                            placeholder={getPlaceholder()}
                            className='flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0'
                            aria-label='검색어 입력'
                        />
                        {keyword && (
                            <button
                                type='button'
                                onClick={handleClearKeyword}
                                className='px-2 py-3 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                                aria-label='검색어 지우기'
                            >
                                <svg
                                    className='w-4 h-4'
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
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            </button>
                        )}
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

            {/* AutoComplete 컴포넌트 */}
            <AutoComplete
                keyword={keyword}
                onSelectBook={handleBookSelect}
                isVisible={showAutoComplete}
                onClose={handleCloseAutoComplete}
            />
        </div>
    );
}

export default SearchBox;
