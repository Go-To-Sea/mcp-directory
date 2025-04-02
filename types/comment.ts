export interface Comment {
  id?: number;
  uuid: string;
<<<<<<< HEAD
  user_id: string;  // 改为 string 类型以匹配 Clerk 的 userId
  user_nickname: string;
  user_avatar_url: string;
  project_id: number;
=======
  user_id: string;
  user_nickname?: string;
  user_avatar_url?: string;
  project_id: string;
>>>>>>> c686117f0158b7723c3b5198dcc071259b655882
  content: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  replies?: Comment[];
}

export interface Reply {
  id?: number;
  uuid: string;
  comment_id: number;
  user_id: number;
  user_nickname: string;
  user_avatar_url: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
}