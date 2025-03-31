'use client';

import { useAuthWithDatabase } from '@/hooks/auth-hooks';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用自定义钩子处理用户登录后将信息保存到数据库
  useAuthWithDatabase();

  return <>{children}</>;
}