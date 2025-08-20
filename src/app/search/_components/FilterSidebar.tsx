// components/FilterSidebar.tsx

// 부모 컴포넌트에서 FilterSidebar를 사용할 때 onFilterChange을 넘겨줘야된다는걸 명시적으로 표현
interface FilterProps {
    display_title: boolean;
    setDisplay_title: (isChecked: boolean) => void;
    publisher_name: boolean;
    setPublisher_name: (isChecked: boolean) => void;
    authors: boolean;
    setAuthors: (isChecked: boolean) => void;
}

export default function FilterSidebar({
    display_title,
    setDisplay_title,
    publisher_name,
    setPublisher_name,
    authors,
    setAuthors,
}: FilterProps) {
    return (
        <div className='border border-gray-200 rounded-lg p-4 bg-gray-50 min-w-fit'>
            <h3 className='text-sm font-semibold text-gray-800 mb-3'>검색 조건</h3>

            <div className='space-y-2'>
                <label className='flex items-center gap-2 cursor-pointer group'>
                    <input
                        type='checkbox'
                        name='title'
                        checked={display_title}
                        onChange={(e) => setDisplay_title(e.target.checked)}
                        className='w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1 transition-all duration-200'
                    />
                    <span className='text-xs text-gray-700 group-hover:text-blue-700 transition-colors duration-200'>
                        상품명
                    </span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer group'>
                    <input
                        type='checkbox'
                        name='author'
                        checked={authors}
                        onChange={(e) => setAuthors(e.target.checked)}
                        className='w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1 transition-all duration-200'
                    />
                    <span className='text-xs text-gray-700 group-hover:text-blue-700 transition-colors duration-200'>
                        저자/역자
                    </span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer group'>
                    <input
                        type='checkbox'
                        name='publisher'
                        checked={publisher_name}
                        onChange={(e) => setPublisher_name(e.target.checked)}
                        className='w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1 transition-all duration-200'
                    />
                    <span className='text-xs text-gray-700 group-hover:text-blue-700 transition-colors duration-200'>
                        출판사
                    </span>
                </label>
            </div>
        </div>
    );
}
