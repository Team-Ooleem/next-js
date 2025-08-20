// app/cart/_components/CartHeader.tsx
'use client';

interface User {
    id: number;
    name: string;
    email: string;
}

type ViewType = 'all' | 'selected' | 'available' | 'direct';

interface CartHeaderProps {
    user: User | null;
    cartItemCount: number;
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export default function CartHeader({
    user,
    cartItemCount,
    currentView,
    onViewChange,
}: CartHeaderProps) {
    return (
        <div className='bg-white border-b'>
            <div className='max-w-6xl mx-auto px-4 py-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <h1 className='text-2xl font-bold text-gray-900'>
                            장바구니 ({cartItemCount})
                        </h1>
                        <div className='flex items-center space-x-2 text-sm text-gray-600'>
                            <span className='text-2xl font-bold bg-gray-100 px-2 py-1 rounded'>
                                {localStorage.getItem('username')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
