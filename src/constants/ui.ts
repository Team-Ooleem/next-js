/**
 * UI 관련 상수들
 */

// 색상 테마
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// z-index 레벨
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

// 애니메이션 지속시간
export const ANIMATION_DURATION = {
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
} as const;

// 폰트 크기
export const FONT_SIZES = {
  XS: '0.75rem',    // 12px
  SM: '0.875rem',   // 14px
  BASE: '1rem',     // 16px
  LG: '1.125rem',   // 18px
  XL: '1.25rem',    // 20px
  '2XL': '1.5rem',  // 24px
  '3XL': '1.875rem', // 30px
  '4XL': '2.25rem', // 36px
} as const;

// 간격 (padding, margin)
export const SPACING = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
} as const;

// 그림자
export const SHADOWS = {
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// 테두리 반경
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '0.125rem',  // 2px
  DEFAULT: '0.25rem', // 4px
  MD: '0.375rem',  // 6px
  LG: '0.5rem',    // 8px
  XL: '0.75rem',   // 12px
  '2XL': '1rem',   // 16px
  FULL: '9999px',
} as const;
