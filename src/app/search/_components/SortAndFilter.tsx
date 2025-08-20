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
        // <select> UI
        <div className='flex items-center gap-3 justify-end'>
            <select value={sort} onChange={(e) => onChangeSort(e.target.value as any)}>
                <option value='latest'>최신순</option>
                <option value='title'>상품명순</option>
                <option value='price_asc'>낮은 가격순</option>
                <option value='price_desc'>높은 가격순</option>
            </select>

            <select
                value={pageSize}
                onChange={(e) => onChangePageSize(Number(e.target.value) as 3 | 5 | 10 | 20)}
            >
                <option value={3}>3개씩 보기</option>
                <option value={5}>5개씩 보기</option>
                <option value={10}>10개씩 보기</option>
                <option value={20}>20개씩 보기</option>
            </select>
        </div>
    );
}
