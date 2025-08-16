// Service 레이어 인덱스 파일
export { UserService } from './user.service';
export { ProductService } from './product.service';

// Service 인스턴스들
export const userService = new UserService();
export const productService = new ProductService();
