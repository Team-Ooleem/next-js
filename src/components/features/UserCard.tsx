'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onView?: (userId: string) => void;
  showActions?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  onView,
  showActions = true,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(user);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      onDelete(user.id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(user.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card hover={!!onView} className="h-full">
      <CardHeader>
        <CardTitle as="h3">{user.name}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-gray-500">이메일:</span>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">가입일:</span>
            <p className="text-sm text-gray-900">{formatDate(user.createdAt)}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">수정일:</span>
            <p className="text-sm text-gray-900">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter>
          <div className="flex space-x-2">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleView}
                onKeyDown={(e) => handleKeyDown(e, handleView)}
                className="flex-1"
                aria-label={`${user.name} 사용자 상세보기`}
              >
                보기
              </Button>
            )}
            
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEdit}
                onKeyDown={(e) => handleKeyDown(e, handleEdit)}
                className="flex-1"
                aria-label={`${user.name} 사용자 정보 수정`}
              >
                수정
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                onKeyDown={(e) => handleKeyDown(e, handleDelete)}
                className="flex-1"
                aria-label={`${user.name} 사용자 삭제`}
              >
                삭제
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
