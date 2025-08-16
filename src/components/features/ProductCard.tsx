'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  showActions?: boolean;
  showPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onView,
  onAddToCart,
  showActions = true,
  showPrice = true,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      onDelete(product.id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(product.id);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <Card hover={!!onView} className="h-full flex flex-col">
      <CardHeader>
        <div className="relative w-full h-48 mb-3">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">이미지 없음</span>
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">품절</span>
            </div>
          )}
        </div>
        
        <CardTitle as="h3" className="line-clamp-2">{product.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">카테고리:</span>
            <span className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">재고:</span>
            <span 
              className={`text-sm font-medium px-2 py-1 rounded ${
                isOutOfStock 
                  ? 'text-red-600 bg-red-100' 
                  : isLowStock 
                  ? 'text-yellow-600 bg-yellow-100' 
                  : 'text-green-600 bg-green-100'
              }`}
            >
              {product.stock}개
            </span>
          </div>
          
          {showPrice && (
            <div className="pt-2 border-t">
              <p className="text-lg font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      {showActions && (
        <CardFooter>
          <div className="flex flex-col space-y-2">
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                onKeyDown={(e) => handleKeyDown(e, handleAddToCart)}
                disabled={isOutOfStock}
                className="w-full"
                aria-label={`${product.name} 장바구니에 추가`}
              >
                {isOutOfStock ? '품절' : '장바구니 추가'}
              </Button>
            )}
            
            <div className="flex space-x-2">
              {onView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleView}
                  onKeyDown={(e) => handleKeyDown(e, handleView)}
                  className="flex-1"
                  aria-label={`${product.name} 상품 상세보기`}
                >
                  보기
                </Button>
              )}
              
              {onEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleEdit}
                  onKeyDown={(e) => handleKeyDown(e, handleEdit)}
                  className="flex-1"
                  aria-label={`${product.name} 상품 정보 수정`}
                >
                  수정
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  onKeyDown={(e) => handleKeyDown(e, handleDelete)}
                  className="flex-1"
                  aria-label={`${product.name} 상품 삭제`}
                >
                  삭제
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
