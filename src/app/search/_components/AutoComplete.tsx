'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    price: number;
}

interface AutoCompleteProps {
    keyword: string;
    searchType: 'title' | 'author';
    onSelectBook: (book: Book) => void;
    isVisible: boolean;
    onClose: () => void;
}

function AutoComplete({
    keyword,
    searchType,
    onSelectBook,
    isVisible,
    onClose,
}: AutoCompleteProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (keyword.trim().length > 0 && isVisible) {
            setIsLoading(true);

            const fetchAutoComplete = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:4000/api/autocomplete?keyword=${encodeURIComponent(keyword)}&type=${searchType}`,
                        {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Cache-Control': 'no-cache',
                            },
                        },
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setBooks(data.books || []);
                    } else {
                        console.error('AutoComplete API 요청 실패:', response.status);
                        setBooks([]);
                    }
                } catch (error) {
                    console.error('AutoComplete API 호출 중 오류:', error);
                    setBooks([]);
                } finally {
                    setIsLoading(false);
                }
            };

            // 디바운싱을 위한 타이머
            const timer = setTimeout(() => {
                fetchAutoComplete();
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setBooks([]);
        }
    }, [keyword, searchType, isVisible]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible || keyword.trim().length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto'
        >
            {isLoading ? (
                <div className='p-4 text-center text-gray-500'>검색 중...</div>
            ) : books.length > 0 ? (
                <div className='py-2'>
                    {books.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => onSelectBook(book)}
                            className='flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                        >
                            {/* 책 표지 이미지 */}
                            <div className='flex-shrink-0 w-16 h-20 mr-4'>
                                <Image
                                    src={book.coverImage}
                                    alt={book.title}
                                    width={64}
                                    height={80}
                                    className='w-full h-full object-cover rounded'
                                    unoptimized
                                />
                            </div>

                            {/* 책 정보 */}
                            <div className='flex-1 min-w-0'>
                                <h3
                                    className='text-sm font-medium text-gray-900 mb-1 overflow-hidden'
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {book.title}
                                </h3>
                                <p className='text-sm text-gray-600 mb-2'>{book.author}</p>
                                <div className='flex items-center'>
                                    <span className='text-gray-900 text-sm font-bold'>
                                        {book.price.toLocaleString()}원
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='p-4 text-center text-gray-500'>검색 결과가 없습니다.</div>
            )}
        </div>
    );
}

export default AutoComplete;
