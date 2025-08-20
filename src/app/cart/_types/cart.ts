// types/cart.ts (공통 타입 정의)
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: string;
    productId: number;
}

export interface Statistics {
    totalItems: number;
    deliveryFee: number;
    totalConfirmed: number;
    totalAmount: number;
    points: number;
}

export type ViewType = 'all' | 'selected' | 'available' | 'direct';
export type StepType = 1 | 2 | 3 | 4;

export interface CartResponse {
    success: boolean;
    message: string;
    data?: CartItem[];
}

export interface UserResponse {
    success: boolean;
    message: string;
    data?: User;
}
