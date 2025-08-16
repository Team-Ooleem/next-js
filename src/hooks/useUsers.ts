'use client';

import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/services';
import type { User, PaginationParams, CreateUserRequest, UpdateUserRequest } from '@/types';

interface UseUsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
}

interface UseUsersReturn extends UseUsersState {
  fetchUsers: (params?: PaginationParams) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<User | null>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
  searchUsers: (query: string, params?: PaginationParams) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export const useUsers = (initialParams?: PaginationParams): UseUsersReturn => {
  const [state, setState] = useState<UseUsersState>({
    users: [],
    loading: false,
    error: null,
    pagination: null,
  });

  const [currentParams, setCurrentParams] = useState<PaginationParams>(
    initialParams || { page: 1, limit: 10 }
  );

  const fetchUsers = useCallback(async (params?: PaginationParams) => {
    const searchParams = params || currentParams;
    setCurrentParams(searchParams);
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.getUsers(searchParams);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          users: response.data,
          pagination: 'pagination' in response ? response.pagination : null,
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 목록을 가져오는데 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, [currentParams]);

  const createUser = useCallback(async (userData: CreateUserRequest): Promise<User | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.createUser(userData);
      
      if (response.status === 'success') {
        // 새 사용자를 목록에 추가
        setState(prev => ({
          ...prev,
          users: [response.data, ...prev.users],
          loading: false,
        }));
        
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 생성에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return null;
    }
  }, []);

  const updateUser = useCallback(async (id: string, userData: UpdateUserRequest): Promise<User | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.updateUser(id, userData);
      
      if (response.status === 'success') {
        // 사용자 목록에서 해당 사용자 업데이트
        setState(prev => ({
          ...prev,
          users: prev.users.map(user => 
            user.id === id ? response.data : user
          ),
          loading: false,
        }));
        
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 정보 수정에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return null;
    }
  }, []);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.deleteUser(id);
      
      if (response.status === 'success') {
        // 사용자 목록에서 해당 사용자 제거
        setState(prev => ({
          ...prev,
          users: prev.users.filter(user => user.id !== id),
          loading: false,
        }));
        
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 삭제에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      return false;
    }
  }, []);

  const searchUsers = useCallback(async (query: string, params?: PaginationParams) => {
    const searchParams = params || currentParams;
    setCurrentParams(searchParams);
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.searchUsers(query, searchParams);
      
      if (response.status === 'success') {
        setState(prev => ({
          ...prev,
          users: response.data,
          pagination: 'pagination' in response ? response.pagination : null,
          loading: false,
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '사용자 검색에 실패했습니다.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  }, [currentParams]);

  const refreshUsers = useCallback(async () => {
    await fetchUsers(currentParams);
  }, [fetchUsers, currentParams]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    ...state,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    refreshUsers,
  };
};
