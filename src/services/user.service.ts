import { userRepository } from '@/repositories';
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  PaginationParams,
  LoginRequest,
  LoginResponse 
} from '@/types';

export class UserService {
  // 사용자 목록 조회
  async getUsers(params: PaginationParams) {
    try {
      const response = await userRepository.findAll(params);
      return response;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('사용자 목록을 가져오는데 실패했습니다.');
    }
  }

  // 사용자 단일 조회
  async getUserById(id: string) {
    if (!id) {
      throw new Error('사용자 ID가 필요합니다.');
    }

    try {
      const response = await userRepository.findById(id);
      return response;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('사용자 정보를 가져오는데 실패했습니다.');
    }
  }

  // 사용자 생성
  async createUser(userData: CreateUserRequest) {
    // 비즈니스 로직 검증
    if (!userData.email || !userData.name || !userData.password) {
      throw new Error('필수 필드가 누락되었습니다.');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    if (userData.password.length < 8) {
      throw new Error('비밀번호는 8자 이상이어야 합니다.');
    }

    try {
      // 이메일 중복 확인
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser.status === 'success') {
        throw new Error('이미 존재하는 이메일입니다.');
      }
    } catch (error) {
      // 사용자가 존재하지 않는 경우는 정상
      if (error instanceof Error && error.message !== '이미 존재하는 이메일입니다.') {
        console.log('Email check passed');
      } else {
        throw error;
      }
    }

    try {
      const response = await userRepository.create(userData);
      return response;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error('사용자 생성에 실패했습니다.');
    }
  }

  // 사용자 정보 수정
  async updateUser(id: string, userData: UpdateUserRequest) {
    if (!id) {
      throw new Error('사용자 ID가 필요합니다.');
    }

    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    try {
      const response = await userRepository.update(id, userData);
      return response;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('사용자 정보 수정에 실패했습니다.');
    }
  }

  // 사용자 삭제
  async deleteUser(id: string) {
    if (!id) {
      throw new Error('사용자 ID가 필요합니다.');
    }

    try {
      const response = await userRepository.delete(id);
      return response;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('사용자 삭제에 실패했습니다.');
    }
  }

  // 사용자 검색
  async searchUsers(query: string, params: PaginationParams) {
    if (!query.trim()) {
      throw new Error('검색어가 필요합니다.');
    }

    try {
      const response = await userRepository.search(query, params);
      return response;
    } catch (error) {
      console.error('Failed to search users:', error);
      throw new Error('사용자 검색에 실패했습니다.');
    }
  }

  // 로그인 (예시)
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error('이메일과 비밀번호가 필요합니다.');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    try {
      // 실제로는 별도의 auth repository나 API를 사용
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      const loginData = await response.json();
      return loginData;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('로그인에 실패했습니다.');
    }
  }

  // 이메일 유효성 검증
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
