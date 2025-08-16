'use client';

import { useState, useEffect } from 'react';

/**
 * useDebounce 훅
 * 값의 변경을 지연시켜 불필요한 API 호출이나 연산을 방지합니다.
 * 
 * @param value - 디바운스할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 지정된 지연 시간 후에 값을 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 값이 변경되면 이전 타이머를 클리어
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * useDebouncedCallback 훅
 * 콜백 함수의 실행을 지연시킵니다.
 * 
 * @param callback - 디바운스할 콜백 함수
 * @param delay - 지연 시간 (밀리초)
 * @param deps - 의존성 배열
 * @returns 디바운스된 콜백 함수
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T => {
  const [debouncedCallback, setDebouncedCallback] = useState<T>(() => callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, ...deps]);

  return debouncedCallback;
};
