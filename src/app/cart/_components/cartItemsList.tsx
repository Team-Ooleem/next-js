'use client';

import { useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: string;
    productId: number;
}

interface CartItemsListProps {
    items: CartItem[];
    onUpdateCart: () => void;
}

export default function CartItemsList({ items, onUpdateCart }: CartItemsListProps) {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const handleSelectItem = (itemId: number): void => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
        } else {
            newSelected.add(itemId);
        }
        setSelectedItems(newSelected);
    };

    const handleQuantityChange = async (itemId: number, newQuantity: number): Promise<void> => {
        if (newQuantity < 1) return;

        try {
            await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId,
                    quantity: newQuantity,
                }),
            });

            onUpdateCart();
        } catch (error) {
            console.error('수량 변경 실패:', error);
        }
    };

    const handleRemoveItem = async (itemId: number): Promise<void> => {
        try {
            await fetch(`/api/cart?itemId=${itemId}`, {
                method: 'DELETE',
            });

            onUpdateCart();
        } catch (error) {
            console.error('상품 삭제 실패:', error);
        }
    };

    return (
        <div className='p-4'>
            {items.map((item: CartItem) => (
                <div key={item.id} className='border-b pb-4 mb-4 last:border-b-0'>
                    <div className='flex items-center space-x-4'>
                        <input
                            type='checkbox'
                            className='rounded'
                            checked={selectedItems.has(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                        />
                        <div className='w-20 h-20 bg-gray-200 rounded'>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-20 h-20 rounded object-cover'
                                />
                            )}
                        </div>
                        <div className='flex-1'>
                            <h3 className='font-medium text-gray-900'>{item.name}</h3>
                            <p className='text-sm text-gray-500'>{item.description}</p>
                            <p className='text-lg font-bold text-gray-900'>
                                {item.price.toLocaleString()}원
                            </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className='px-3 py-1 border rounded hover:bg-gray-50 transition-colors'
                            >
                                -
                            </button>
                            <span className='px-3'>{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className='px-3 py-1 border rounded hover:bg-gray-50 transition-colors'
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            className='text-red-500 hover:text-red-700 px-2 transition-colors'
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
