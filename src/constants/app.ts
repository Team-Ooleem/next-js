/**
 * 애플리케이션 전반적인 상수들
 */

// 앱 정보
export const APP_INFO = {
  NAME: 'My Next.js App',
  VERSION: '1.0.0',
  DESCRIPTION: 'Layered Architecture를 사용한 Next.js 애플리케이션',
  AUTHOR: 'Frontend Developer',
} as const;

// 환경 변수 키
export const ENV_KEYS = {
  API_BASE_URL: 'NEXT_PUBLIC_API_BASE_URL',
  APP_ENV: 'NODE_ENV',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  UPLOAD_MAX_SIZE: 'UPLOAD_MAX_SIZE',
} as const;

// 로컬 스토리지 키
export const LOCAL_STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  CART_ITEMS: 'cart_items',
  RECENT_SEARCHES: 'recent_searches',
} as const;

// 세션 스토리지 키
export const SESSION_STORAGE_KEYS = {
  FORM_DATA: 'form_data',
  SCROLL_POSITION: 'scroll_position',
  CURRENT_TAB: 'current_tab',
} as const;

// 쿠키 키
export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// 기본 설정값
export const DEFAULT_SETTINGS = {
  THEME: 'light' as const,
  LANGUAGE: 'ko' as const,
  TIMEZONE: 'Asia/Seoul',
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm:ss',
  CURRENCY: 'KRW' as const,
  ITEMS_PER_PAGE: 10,
} as const;

// 지원하는 언어
export const SUPPORTED_LANGUAGES = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja',
  ZH: 'zh',
} as const;

// 지원하는 테마
export const SUPPORTED_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// 파일 업로드 설정
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  ALLOWED_EXTENSIONS: {
    IMAGES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    DOCUMENTS: ['pdf', 'doc', 'docx', 'txt'],
  },
} as const;

// 유효성 검사 규칙
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    ALLOWED_CHARS: /^[a-zA-Z0-9_]+$/,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
} as const;

// 알림 설정
export const NOTIFICATION_SETTINGS = {
  DURATION: {
    SUCCESS: 3000,
    INFO: 4000,
    WARNING: 5000,
    ERROR: 6000,
  },
  POSITION: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    TOP_CENTER: 'top-center',
    BOTTOM_CENTER: 'bottom-center',
  },
} as const;

// 디바운스/쓰로틀 지연시간
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  INPUT: 500,
  RESIZE: 250,
  SCROLL: 100,
} as const;
