// Pagination 컴포넌트 -> 아래 페이지 나누는 부분 출력
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className='flex justify-center space-x-2 mt-6'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
                <button
                    key={idx + 1}
                    onClick={() => onPageChange(idx + 1)}
                    className={`px-3 py-1 border rounded ${
                        currentPage === idx + 1 ? 'bg-gray-200 font-bold' : ''
                    }`}
                >
                    {idx + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                Next
            </button>
        </div>
    );
}
