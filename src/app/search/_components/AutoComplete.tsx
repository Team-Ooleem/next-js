'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// hooks
import { useDebounce } from '@/hooks/useDebounce';

// types
import { fetchAutoCompleteBooks } from '../_api/api';
import { Book } from '../_types/book';

interface AutoCompleteProps {
    keyword: string;
    onSelectBook: (book: Book) => void;
    isVisible: boolean;
    onClose: () => void;
}

function AutoComplete({ keyword, onSelectBook, isVisible, onClose }: AutoCompleteProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // 디바운싱된 키워드 (300ms 지연)
    const debouncedKeyword = useDebounce(keyword, 300);

    // useQuery를 사용한 데이터 페칭 및 상태 관리
    const {
        data: books = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['autocomplete', debouncedKeyword],
        queryFn: () => fetchAutoCompleteBooks(debouncedKeyword),
        enabled: debouncedKeyword.trim().length > 0 && isVisible, // 조건부 실행

        // === 다양한 useQuery 옵션들 (주석 처리) ===
        // staleTime: 5 * 60 * 1000, // 5분 - 데이터가 stale 상태가 되기까지의 시간
        // gcTime: 10 * 60 * 1000, // 10분 - 캐시가 가비지 컬렉션되기까지의 시간 (구 cacheTime)
        // refetchOnWindowFocus: false, // 윈도우 포커스 시 리페치 비활성화
        // refetchOnMount: true, // 컴포넌트 마운트 시 리페치
        // refetchOnReconnect: true, // 네트워크 재연결 시 리페치
        // retry: 3, // 실패 시 재시도 횟수
        // retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // 재시도 딜레이
        // select: (data) => data.filter(book => book.price > 0), // 데이터 변환
        // placeholderData: [], // 로딩 중에 보여줄 플레이스홀더 데이터
        // keepPreviousData: true, // 새 데이터 로딩 중에도 이전 데이터 유지 (v5에서는 placeholderData: keepPreviousData 사용)
        // suspense: false, // React Suspense 사용 여부
        // useErrorBoundary: false, // Error Boundary 사용 여부
        // onSuccess: (data) => console.log('데이터 로드 성공:', data), // 성공 콜백 (v5에서 제거됨)
        // onError: (error) => console.error('데이터 로드 실패:', error), // 에러 콜백 (v5에서 제거됨)
        // onSettled: (data, error) => console.log('요청 완료'), // 성공/실패 상관없이 완료 시 콜백 (v5에서 제거됨)
        // refetchInterval: false, // 주기적 리페치 (밀리초 단위)
        // refetchIntervalInBackground: false, // 백그라운드에서도 주기적 리페치
        // notifyOnChangeProps: ['data', 'error'], // 특정 프로퍼티 변경 시에만 리렌더링
        // structuralSharing: true, // 구조적 공유를 통한 메모리 최적화
        // networkMode: 'online', // 네트워크 모드 ('online' | 'always' | 'offlineFirst')
        // meta: { persist: false }, // 쿼리 메타데이터
    });

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
            ) : isError ? (
                <div className='p-4 text-center text-red-500'>
                    검색 중 오류가 발생했습니다: {error?.message}
                </div>
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
