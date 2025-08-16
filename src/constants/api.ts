/**
 * API 관련 상수들
 */

// API 엔드포인트
export const API_ENDPOINTS = {
  // 사용자 관련
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_BY_EMAIL: (email: string) => `/users/email/${email}`,
  USER_SEARCH: '/users/search',
  
  // 상품 관련
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCT_BY_CATEGORY: '/products/category',
  PRODUCT_SEARCH: '/products/search',
  PRODUCT_POPULAR: '/products/popular',
  PRODUCT_STOCK: (id: string) => `/products/${id}/stock`,
  
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // 파일 업로드
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
  },
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// API 응답 메시지
export const API_MESSAGES = {
  SUCCESS: '성공적으로 처리되었습니다.',
  ERROR: '오류가 발생했습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
} as const;

// 요청 타임아웃 (밀리초)
export const REQUEST_TIMEOUT = {
  DEFAULT: 10000, // 10초
  UPLOAD: 60000,  // 1분
  DOWNLOAD: 30000, // 30초
} as const;

// 페이지네이션 기본값
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
  SORT_ORDER: 'desc' as const,
} as const;
