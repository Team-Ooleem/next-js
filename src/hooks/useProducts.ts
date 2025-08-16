'use client';

import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services';
import type { Product, PaginationParams, CreateProductRequest, UpdateProductRequest } from '@/types';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
}

interface UseProductsReturn extends UseProductsState {
  fetchProducts: (params?: PaginationParams) => Promise<void>;
  fetchProductsByCategory: (category: string, params?: PaginationParams) => Promise<void>;
  createProduct: (productData: CreateProductRequest) => Promise<Product | null>;
  updateProduct: (id: string, productData: UpdateProductRequest) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateStock: (id: string, stock: number) => Promise<Product | null>;
  searchProducts: (query: string, params?: PaginationParams) => Promise<void>;
  fetchPopularProducts: (limit?: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const useProducts = (initialParams?: PaginationParams): UseProductsReturn => {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: false,
    error: null,
    pagination: null,
  });

  const [currentParams, setCurrentParams] = useState<PaginationParams>(
    initialParams || { page: 1, limit: 12 }
  );

  const fetchProducts = useCallback(async (params?: PaginationParams) => {
    const searchParams = params || currentParams;
    setCurrentParams(searchParams);
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.getProducts(searchParams);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: response.data,
          pagination: 'pagination' in response ? response.pagination : null,
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상품 목록을 가져오는데 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, [currentParams]);

  const fetchProductsByCategory = useCallback(async (category: string, params?: PaginationParams) => {
    const searchParams = params || currentParams;
    setCurrentParams(searchParams);
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.getProductsByCategory(category, searchParams);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: response.data,
          pagination: 'pagination' in response ? response.pagination : null,
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '카테고리별 상품을 가져오는데 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, [currentParams]);

  const createProduct = useCallback(async (productData: CreateProductRequest): Promise<Product | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.createProduct(productData);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: [response.data, ...prev.products],
          loading: false,
        }));
        
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상품 생성에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return null;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productData: UpdateProductRequest): Promise<Product | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.updateProduct(id, productData);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: prev.products.map(product => 
            product.id === id ? response.data : product
          ),
          loading: false,
        }));
        
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상품 정보 수정에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return null;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.deleteProduct(id);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: prev.products.filter(product => product.id !== id),
          loading: false,
        }));
        
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상품 삭제에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return false;
    }
  }, []);

  const updateStock = useCallback(async (id: string, stock: number): Promise<Product | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.updateStock(id, stock);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: prev.products.map(product => 
            product.id === id ? response.data : product
          ),
          loading: false,
        }));
        
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '재고 업데이트에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return null;
    }
  }, []);

  const searchProducts = useCallback(async (query: string, params?: PaginationParams) => {
    const searchParams = params || currentParams;
    setCurrentParams(searchParams);
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.searchProducts(query, searchParams);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: response.data,
          pagination: 'pagination' in response ? response.pagination : null,
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상품 검색에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, [currentParams]);

  const fetchPopularProducts = useCallback(async (limit: number = 10) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productService.getPopularProducts(limit);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          products: response.data,
          pagination: null, // 인기 상품은 페이지네이션 없음
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '인기 상품을 가져오는데 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts(currentParams);
  }, [fetchProducts, currentParams]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    ...state,
    fetchProducts,
    fetchProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    searchProducts,
    fetchPopularProducts,
    refreshProducts,
  };
};
