// Props 타입 정의 - 부모가 반드시 아래와 같은 타입을 넘겨줘야함! 안맞으면 컴파일에러 발생
type SortAndFilterProps = {
    sort: 'latest' | 'title' | 'price_asc' | 'price_desc';
    onChangeSort: (val: 'latest' | 'title' | 'price_asc' | 'price_desc') => void;
    pageSize: 3 | 5 | 10 | 20;
    onChangePageSize: (val: 3 | 5 | 10 | 20) => void;
};

export default function SortAndFilter({
    sort,
    onChangeSort,
    pageSize,
    onChangePageSize,
}: SortAndFilterProps) {
    return (
        <div className='flex items-center gap-4 justify-end mb-4'>
            <div className='flex items-center gap-2'>
                <label className='text-sm font-medium text-gray-700'>정렬:</label>
                <select
                    value={sort}
                    onChange={(e) => onChangeSort(e.target.value as any)}
                    className='px-3 py-2 border-2 !border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400'
                    style={{ border: '2px solid #d1d5db !important' }}
                >
                    <option value='latest'>최신순</option>
                    <option value='title'>상품명순</option>
                    <option value='price_asc'>낮은 가격순</option>
                    <option value='price_desc'>높은 가격순</option>
                </select>
            </div>

            <div className='flex items-center gap-2'>
                <label className='text-sm font-medium text-gray-700'>표시:</label>
                <select
                    value={pageSize}
                    onChange={(e) => onChangePageSize(Number(e.target.value) as 3 | 5 | 10 | 20)}
                    className='px-3 py-2 border-2 !border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400'
                    style={{ border: '2px solid #d1d5db !important' }}
                >
                    <option value={3}>3개씩</option>
                    <option value={5}>5개씩</option>
                    <option value={10}>10개씩</option>
                    <option value={20}>20개씩</option>
                </select>
            </div>
        </div>
    );
}
