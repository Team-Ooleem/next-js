// app/cart/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// components
import CartHeader from './_components/cartheader';
import CartItemsList from './_components/cartItemsList';
import CartToolbar from './_components/cartToolbar';
import EmptyCart from './_components/emptyCart';
import OrderSummary from './_components/orderSummary';
import StepIndicator from './_components/stepIndicator';

// types
interface User {
    id: number;
    name: string;
    email: string;
}

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: string;
    productId: number;
}

interface Statistics {
    totalItems: number;
    deliveryFee: number;
    totalConfirmed: number;
    totalAmount: number;
    points: number;
}

type ViewType = 'all' | 'selected' | 'available' | 'direct';
type StepType = 1 | 2 | 3 | 4;

// "use client" 사용 위해 임시 주석처리
// export const metadata: Metadata = {
//     title: 'Shopping Cart',
//     description: 'Your shopping cart',
// };

export function mapCartsToCartItems(carts: any[]): CartItem[] {
    return carts.map((cart) => ({
        id: cart.cart_id, // 장바구니 ID
        name: cart.display_title, // 책 제목
        description: cart.subtitle || '', // 부제 → 없으면 빈 문자열
        price: cart.list_price, // 가격
        quantity: cart.quantity, // 수량
        productId: cart.book_id, // 책 ID
        image: cart.cover_image_url || '', // 이미지 필드 있으면 추가
    }));
}

export default function CartPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 사용자 정보 상태
    const [user, setUser] = useState<User | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [statistics, setStatistics] = useState<Statistics>({
        totalItems: 0,
        deliveryFee: 0,
        totalConfirmed: 0,
        totalAmount: 0,
        points: 0,
    });

    // URL 파라미터에서 초기값 가져오기
    const initialView: ViewType = (searchParams.get('view') as ViewType) || 'all';
    const initialStep: StepType = (Number(searchParams.get('step')) as StepType) || 1;

    const [currentView, setCurrentView] = useState<ViewType>(initialView);
    const [currentStep, setCurrentStep] = useState<StepType>(initialStep);

    // mini_project users 테이블에서 사용자 정보 가져오기
    useEffect(() => {
        //fetchUserData();
        fetchCartItems();
    }, []);

    // view, step 변경되면 URL 업데이트
    useEffect(() => {
        const params = new URLSearchParams();
        if (currentView !== 'all') params.set('view', currentView);
        if (currentStep !== 1) params.set('step', currentStep.toString());

        const queryString = params.toString();
        router.push(queryString ? `?${queryString}` : '/cart');
    }, [currentView, currentStep, router]);

    // const fetchUserData = async (): Promise<void> => {
    //     try {
    //         // API 호출 예시
    //         const response = await fetch('/api/users/current');
    //         const userData: User = await response.json();
    //         setUser(userData);
    //     } catch (error) {
    //         console.error('사용자 데이터 로딩 실패:', error);
    //         // 개발용 더미 데이터
    //         setUser({ name: '장바구니', id: 1, email: 'user@example.com' });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchCartItems = async (): Promise<void> => {
        try {
            // 장바구니 아이템 API 호출
            const token = localStorage.getItem('accessToken');
            const user_id = localStorage.getItem('userId');

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}api/cart?user_id=${user_id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const items = await response.json();
            const cartItems = mapCartsToCartItems(items.carts);
            setCartItems(cartItems);
            console.log(cartItems);
            // 통계 계산
            // const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            // setStatistics((prev) => ({
            //     ...prev,
            //     totalItems: total,
            //     totalAmount: total,
            //}));
        } catch (error) {
            console.error('장바구니 데이터 로딩 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleContinueShopping = (): void => {
        router.push('/search');
    };

    const handleCheckout = (): void => {
        setCurrentStep(2);
        router.push('/cart?step=2');
    };

    const handleStepChange = (step: StepType): void => {
        setCurrentStep(step);
    };

    const handleViewChange = (view: ViewType): void => {
        setCurrentView(view);
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-gray-600'>로딩 중...</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* 헤더 */}
            <CartHeader
                user={user}
                cartItemCount={cartItems.length}
                currentView={currentView}
                onViewChange={handleViewChange}
            />

            {/* 단계 표시 */}
            <div className='bg-white border-b'>
                <div className='max-w-6xl mx-auto px-4 py-4'>
                    <div className='flex items-center space-x-8'>
                        <StepIndicator step={1} active={currentStep === 1} text='장바구니' />
                        <StepIndicator step={2} active={currentStep === 2} text='사용자선택' />
                        <StepIndicator step={3} active={currentStep === 3} text='주문/결제' />
                        <StepIndicator step={4} active={currentStep === 4} text='주문완료' />
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className='max-w-6xl mx-auto px-4 py-6'>
                <div className='flex gap-6'>
                    {/* 왼쪽 영역 - 장바구니 내용 */}
                    <div className='flex-1'>
                        <div className='bg-white rounded-lg shadow-sm'>
                            {/* 툴바 */}
                            <CartToolbar
                                currentView={currentView}
                                onViewChange={handleViewChange}
                            />

                            {/* 장바구니 아이템 또는 빈 상태 */}
                            {cartItems.length === 0 ? (
                                <EmptyCart onContinueShopping={handleContinueShopping} />
                            ) : (
                                <CartItemsList items={cartItems} onUpdateCart={fetchCartItems} />
                            )}
                        </div>
                    </div>

                    {/* 오른쪽 영역 - 주문 요약 */}
                    <OrderSummary
                        statistics={statistics}
                        itemCount={cartItems.length}
                        onCheckout={handleCheckout}
                        currentStep={currentStep}
                    />
                </div>
            </div>
        </div>
    );
}
