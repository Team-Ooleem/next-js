'use client';

import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((val: T) => T);

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
  loading: boolean;
  error: string | null;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // localStorage에서 값 읽기
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setError(`localStorage에서 "${key}" 값을 읽는데 실패했습니다.`);
      return initialValue;
    }
  }, [initialValue, key]);

  // 값 설정
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        setError(null);
        
        // 함수인 경우 현재 값을 인자로 전달
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // storage 이벤트 발생시키기 (같은 탭에서도 감지하기 위해)
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: { key, newValue: valueToStore },
            })
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
        setError(`localStorage에 "${key}" 값을 저장하는데 실패했습니다.`);
      }
    },
    [key, storedValue]
  );

  // 값 제거
  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // storage 이벤트 발생시키기
        window.dispatchEvent(
          new CustomEvent('local-storage', {
            detail: { key, newValue: null },
          })
        );
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      setError(`localStorage에서 "${key}" 값을 제거하는데 실패했습니다.`);
    }
  }, [initialValue, key]);

  // 초기 값 로드
  useEffect(() => {
    const value = readValue();
    setStoredValue(value);
    setLoading(false);
  }, [readValue]);

  // storage 이벤트 리스너 (다른 탭에서의 변경 감지)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ('key' in e && e.key === key) {
        const newValue = readValue();
        setStoredValue(newValue);
      } else if ('detail' in e && e.detail?.key === key) {
        // CustomEvent인 경우 (같은 탭에서의 변경)
        const newValue = e.detail.newValue ?? initialValue;
        setStoredValue(newValue);
      }
    };

    if (typeof window !== 'undefined') {
      // 다른 탭에서의 변경 감지
      window.addEventListener('storage', handleStorageChange);
      
      // 같은 탭에서의 변경 감지
      window.addEventListener('local-storage', handleStorageChange as EventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('local-storage', handleStorageChange as EventListener);
      }
    };
  }, [key, readValue, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error,
  };
};
