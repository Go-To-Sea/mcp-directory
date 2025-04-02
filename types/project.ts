export interface Project {
  id: number;
  name: string;
  uuid: string;
  title?: string;
  description: string;
  content?: string;
  author_name?: string;
  author_avatar_url?: string;
  url?: string;
  github_url?: string;
  tags: string[] | string;
  category?: string;
  type?: 'server' | 'client';  // 添加 type 属性，可以是 'server' 或 'client'
  updated_at?: string;  // 添加更新时间属性
  created_at?: string;  // 添加创建时间属性
  summary?: string;  // 添加摘要属性
  target?: '_self' | '_blank';  // 添加 target 属性，用于链接打开方式
  status?: string;           // 添加状态属性
  is_featured?: boolean;     // 添加是否特色项目属性
  sort?: number;            // 添加排序属性
  img_url?: string;      // 添加图片 URL 属性
  avatar_url?: string;   // 添加头像 URL 属性
  user_submit?: boolean;     // 是否是用户提交
  submit_time?: string;  // 提交时间
}

export interface ClassMenus {
  name: string;
  title?: string;
  count?: number;
  description?: string;
  href: string;      // 添加 href 属性用于导航链接
}