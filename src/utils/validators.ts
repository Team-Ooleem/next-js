/**
 * 유효성 검증 유틸리티 함수들
 */

// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 강도 검사
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호에 대문자가 포함되어야 합니다.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호에 소문자가 포함되어야 합니다.');
  }

  if (!/\d/.test(password)) {
    errors.push('비밀번호에 숫자가 포함되어야 합니다.');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('비밀번호에 특수문자가 포함되어야 합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 한국 전화번호 유효성 검사
export const isValidKoreanPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  const phoneRegex = /^(010|011|016|017|018|019)\d{7,8}$/;
  return phoneRegex.test(cleaned);
};

// URL 유효성 검사
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 한국 주민등록번호 유효성 검사 (기본 형식만)
export const isValidKoreanSSN = (ssn: string): boolean => {
  const cleaned = ssn.replace(/\D/g, '');
  return /^\d{13}$/.test(cleaned);
};

// 신용카드 번호 유효성 검사 (Luhn 알고리즘)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// 숫자 범위 검사
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// 문자열 길이 검사
export const isValidLength = (str: string, minLength: number, maxLength?: number): boolean => {
  if (str.length < minLength) return false;
  if (maxLength && str.length > maxLength) return false;
  return true;
};

// 빈 값 검사
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// 필수 필드 검사
export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): {
  isValid: boolean;
  missingFields: string[];
} => {
  const missingFields = requiredFields.filter(field => isEmpty(data[field]));
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

// 파일 확장자 검사
export const isValidFileExtension = (filename: string, allowedExtensions: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
};

// 파일 크기 검사 (바이트 단위)
export const isValidFileSize = (fileSize: number, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
};
