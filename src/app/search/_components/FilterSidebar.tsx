// components/FilterSidebar.tsx

// 부모 컴포넌트에서 FilterSidebar를 사용할 때 onFilterChange을 넘겨줘야된다는걸 명시적으로 표현
interface FilterProps {
    display_title: boolean,
    setDisplay_title: (isChecked: boolean) => void,
    publisher_name: boolean,
    setPublisher_name: (isChecked: boolean) => void,
    authors: boolean,
    setAuthors: (isChecked: boolean) => void
}

export default function FilterSidebar({
    display_title,
    setDisplay_title,
    publisher_name,
    setPublisher_name,
    authors,
    setAuthors
 }: FilterProps) {
    
    return (
        <div className='filter'>
            <h3>검색조건</h3>
            <label>
                <input type='checkbox' name='title' checked={display_title} onChange={(e) => setDisplay_title(e.target.checked) } />
                상품명
            </label>
            <label>
                <input type='checkbox' name='author' checked={authors} onChange={(e) => setAuthors(e.target.checked) } />
                저자/역자
            </label>
            <label>
                <input type='checkbox' name='publisher' checked={publisher_name} onChange={(e) => setPublisher_name(e.target.checked)} />
                출판사
            </label>
        </div>
    );
}
