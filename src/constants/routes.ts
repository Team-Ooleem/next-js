/**
 * 라우트 경로 상수들
 */

// 공개 라우트
export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
} as const;

// 보호된 라우트 (인증 필요)
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // 사용자 관리
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  USER_EDIT: (id: string) => `/users/${id}/edit`,
  USER_CREATE: '/users/create',
  
  // 상품 관리
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PRODUCT_EDIT: (id: string) => `/products/${id}/edit`,
  PRODUCT_CREATE: '/products/create',
  PRODUCT_CATEGORY: (category: string) => `/products/category/${category}`,
  
  // 주문 관리
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_CREATE: '/orders/create',
  
  // 관리자 전용
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    SETTINGS: '/admin/settings',
    ANALYTICS: '/admin/analytics',
  },
} as const;

// API 라우트
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    SEARCH: '/api/users/search',
  },
  
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    GET: (id: string) => `/api/products/${id}`,
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    BY_CATEGORY: '/api/products/category',
    POPULAR: '/api/products/popular',
  },
  
  UPLOAD: {
    IMAGE: '/api/upload/image',
    FILE: '/api/upload/file',
  },
} as const;

// 외부 링크
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com',
  DOCS: 'https://nextjs.org/docs',
  SUPPORT: 'mailto:support@example.com',
  PRIVACY_POLICY: '/privacy',
  TERMS_OF_SERVICE: '/terms',
} as const;

// 네비게이션 메뉴
export const NAVIGATION_MENU = {
  MAIN: [
    { label: '홈', href: PUBLIC_ROUTES.HOME },
    { label: '상품', href: PROTECTED_ROUTES.PRODUCTS },
    { label: '소개', href: PUBLIC_ROUTES.ABOUT },
    { label: '연락처', href: PUBLIC_ROUTES.CONTACT },
  ],
  
  USER: [
    { label: '대시보드', href: PROTECTED_ROUTES.DASHBOARD },
    { label: '프로필', href: PROTECTED_ROUTES.PROFILE },
    { label: '설정', href: PROTECTED_ROUTES.SETTINGS },
  ],
  
  ADMIN: [
    { label: '관리자 대시보드', href: PROTECTED_ROUTES.ADMIN.DASHBOARD },
    { label: '사용자 관리', href: PROTECTED_ROUTES.ADMIN.USERS },
    { label: '상품 관리', href: PROTECTED_ROUTES.ADMIN.PRODUCTS },
    { label: '주문 관리', href: PROTECTED_ROUTES.ADMIN.ORDERS },
    { label: '분석', href: PROTECTED_ROUTES.ADMIN.ANALYTICS },
    { label: '설정', href: PROTECTED_ROUTES.ADMIN.SETTINGS },
  ],
  
  FOOTER: [
    { label: '개인정보처리방침', href: EXTERNAL_LINKS.PRIVACY_POLICY },
    { label: '이용약관', href: EXTERNAL_LINKS.TERMS_OF_SERVICE },
    { label: '지원', href: EXTERNAL_LINKS.SUPPORT },
  ],
} as const;

// 라우트 권한 설정
export const ROUTE_PERMISSIONS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ADMIN: 'admin',
} as const;
