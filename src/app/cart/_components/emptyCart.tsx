'use client';

interface EmptyCartProps {
    onContinueShopping: () => void;
}

export default function EmptyCart({ onContinueShopping }: EmptyCartProps) {
    return (
        <div className='flex flex-col items-center justify-center py-20'>
            <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4'>
                <span className='text-2xl'>🛒</span>
            </div>
            <p className='text-gray-600 mb-2'>장바구니에 담긴 상품이 없습니다.</p>
            <p className='text-sm text-gray-500 mb-6'>마음에 드는 상품을 담아보세요!</p>
            <button
                onClick={onContinueShopping}
                className='bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors'
            >
                계속 쇼핑하기
            </button>
        </div>
    );
}
