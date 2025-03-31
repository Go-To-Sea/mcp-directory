import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { upsertUser } from '@/models/user';
import { User } from '@/types/user';

/**
 * 自定义钩子，用于在用户登录成功后将用户信息保存到数据库
 * 如果用户已存在（基于email和signin_provider），则更新用户信息
 * 如果用户不存在，则创建新用户
 */
export function useAuthWithDatabase() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    // 确保认证已加载且用户已登录
    if (!isLoaded || !userId || !user) return;

    const saveUserToDatabase = async () => {
      try {
        // 获取用户的主要邮箱
        const primaryEmail = user.primaryEmailAddress?.emailAddress;
        if (!primaryEmail) return;

        // 构建用户数据
        const userData: User = {
          uuid: userId,
          email: primaryEmail,
          nickname: user.firstName || user.username || primaryEmail.split('@')[0],
          avatar_url: user.imageUrl || '',
          locale: user.publicMetadata?.preferredLanguage as string || 'en',
          signin_type: 'oauth',
          signin_ip: '',  // 这个信息可能需要从请求中获取
          signin_provider: user.externalAccounts && user.externalAccounts.length > 0 ? user.externalAccounts[0].provider : 'clerk',
          signin_openid: user.externalAccounts && user.externalAccounts.length > 0 ? user.externalAccounts[0].id : userId,
        };

        // 保存或更新用户信息到数据库
        await upsertUser(userData);
        console.log('用户信息已保存到数据库');
      } catch (error) {
        console.error('保存用户信息到数据库失败:', error);
      }
    };

    saveUserToDatabase();
  }, [isLoaded, userId, user]);

  return { isLoaded, userId, sessionId, user };
}