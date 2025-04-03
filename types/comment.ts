export interface Comment {
  id?: number;
  uuid: string;
  user_id: string;
  user_nickname?: string;
  user_avatar_url?: string;
  project_id: string;
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