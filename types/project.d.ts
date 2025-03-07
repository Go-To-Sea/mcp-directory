export interface Project {
  github_url: string | undefined;
  uuid?: string;
  name?: string;
  title: string;
  type: string;
  description?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  author_name?: string;
  author_avatar_url?: string;
  tags?: string;
  category?: string;
  is_featured?: boolean;
  sort?: number;
  url?: string;
  target?: "_blank" | "_self";
  content?: string;
  summary?: string;
  img_url?: string;
}

export interface ClassMenus {
  name: string;   // 分类名称
  count: number;  // 分类数量
  href: string;   // 分类链接
}