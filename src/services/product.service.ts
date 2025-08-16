import { productRepository } from '@/repositories';
import type { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  PaginationParams 
} from '@/types';

export class ProductService {
  // 상품 목록 조회
  async getProducts(params: PaginationParams) {
    try {
      const response = await productRepository.findAll(params);
      return response;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('상품 목록을 가져오는데 실패했습니다.');
    }
  }

  // 상품 단일 조회
  async getProductById(id: string) {
    if (!id) {
      throw new Error('상품 ID가 필요합니다.');
    }

    try {
      const response = await productRepository.findById(id);
      return response;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('상품 정보를 가져오는데 실패했습니다.');
    }
  }

  // 카테고리별 상품 조회
  async getProductsByCategory(category: string, params: PaginationParams) {
    if (!category) {
      throw new Error('카테고리가 필요합니다.');
    }

    try {
      const response = await productRepository.findByCategory(category, params);
      return response;
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      throw new Error('카테고리별 상품을 가져오는데 실패했습니다.');
    }
  }

  // 상품 생성
  async createProduct(productData: CreateProductRequest) {
    // 비즈니스 로직 검증
    if (!productData.name || !productData.description || !productData.category) {
      throw new Error('필수 필드가 누락되었습니다.');
    }

    if (productData.price <= 0) {
      throw new Error('가격은 0보다 커야 합니다.');
    }

    if (productData.stock < 0) {
      throw new Error('재고는 음수일 수 없습니다.');
    }

    try {
      const response = await productRepository.create(productData);
      return response;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw new Error('상품 생성에 실패했습니다.');
    }
  }

  // 상품 정보 수정
  async updateProduct(id: string, productData: UpdateProductRequest) {
    if (!id) {
      throw new Error('상품 ID가 필요합니다.');
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error('가격은 0보다 커야 합니다.');
    }

    if (productData.stock !== undefined && productData.stock < 0) {
      throw new Error('재고는 음수일 수 없습니다.');
    }

    try {
      const response = await productRepository.update(id, productData);
      return response;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw new Error('상품 정보 수정에 실패했습니다.');
    }
  }

  // 상품 삭제
  async deleteProduct(id: string) {
    if (!id) {
      throw new Error('상품 ID가 필요합니다.');
    }

    try {
      const response = await productRepository.delete(id);
      return response;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw new Error('상품 삭제에 실패했습니다.');
    }
  }

  // 상품 검색
  async searchProducts(query: string, params: PaginationParams) {
    if (!query.trim()) {
      throw new Error('검색어가 필요합니다.');
    }

    try {
      const response = await productRepository.search(query, params);
      return response;
    } catch (error) {
      console.error('Failed to search products:', error);
      throw new Error('상품 검색에 실패했습니다.');
    }
  }

  // 재고 업데이트
  async updateStock(id: string, stock: number) {
    if (!id) {
      throw new Error('상품 ID가 필요합니다.');
    }

    if (stock < 0) {
      throw new Error('재고는 음수일 수 없습니다.');
    }

    try {
      const response = await productRepository.updateStock(id, stock);
      return response;
    } catch (error) {
      console.error('Failed to update stock:', error);
      throw new Error('재고 업데이트에 실패했습니다.');
    }
  }

  // 인기 상품 조회
  async getPopularProducts(limit: number = 10) {
    if (limit <= 0) {
      throw new Error('조회할 상품 수는 0보다 커야 합니다.');
    }

    try {
      const response = await productRepository.findPopular(limit);
      return response;
    } catch (error) {
      console.error('Failed to fetch popular products:', error);
      throw new Error('인기 상품을 가져오는데 실패했습니다.');
    }
  }

  // 재고 부족 상품 확인
  async checkLowStock(threshold: number = 10) {
    try {
      const allProducts = await productRepository.findAll({ page: 1, limit: 1000 });
      
      if (allProducts.status === 'success') {
        const lowStockProducts = allProducts.data.filter(
          product => product.stock <= threshold
        );
        
        return {
          data: lowStockProducts,
          message: `재고가 ${threshold}개 이하인 상품들입니다.`,
          status: 'success' as const,
          timestamp: new Date()
        };
      }
      
      throw new Error('상품 목록을 가져올 수 없습니다.');
    } catch (error) {
      console.error('Failed to check low stock:', error);
      throw new Error('재고 부족 상품 확인에 실패했습니다.');
    }
  }
}
