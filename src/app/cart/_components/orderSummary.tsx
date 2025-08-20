'use client';

interface Statistics {
    totalItems: number;
    deliveryFee: number;
    totalConfirmed: number;
    totalAmount: number;
    points: number;
}

interface OrderSummaryProps {
    statistics: Statistics;
    itemCount: number;
    onCheckout: () => void;
    currentStep: number;
}

export default function OrderSummary({
    statistics,
    itemCount,
    onCheckout,
    currentStep,
}: OrderSummaryProps) {
    return (
        <div className='w-80'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <div className='space-y-4 mb-6'>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-700'>상품 금액</span>
                        <span className='font-medium'>
                            {statistics.totalItems.toLocaleString()}원
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>
                            <span className='text-gray-700'>배송비</span>
                            <span className='text-gray-400 text-sm'>?</span>
                        </div>
                        <span className='font-medium'>
                            {statistics.deliveryFee.toLocaleString()}원
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-700'>상품 할인</span>
                        <span className='font-medium text-blue-600'>
                            {statistics.totalConfirmed.toLocaleString()}원
                        </span>
                    </div>

                    <hr className='my-4' />

                    <div className='flex justify-between items-center text-lg font-bold'>
                        <span>결제 예정 금액</span>
                        <span className='text-xl'>{statistics.totalAmount.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                        <div className='flex items-center space-x-1'>
                            <span className='text-gray-600'>적립 예정 포인트</span>
                            <span className='text-gray-400'>?</span>
                        </div>
                        <span className='text-gray-600'>{statistics.points}P</span>
                    </div>
                </div>

                <button
                    onClick={onCheckout}
                    className={`w-full py-4 rounded-lg font-medium text-lg transition-colors ${
                        itemCount > 0 && currentStep === 1
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-indigo-100 text-indigo-600 cursor-not-allowed'
                    }`}
                    disabled={itemCount === 0 || currentStep !== 1}
                >
                    {currentStep === 1 ? `주문하기 (${itemCount})` : `단계 ${currentStep}`}
                </button>
            </div>
        </div>
    );
}
