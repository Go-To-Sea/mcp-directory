export interface Reply {
  id: number;
  uuid: string;
  comment_id: string;
  user_id: string;
  user_nickname?: string;
  user_avatar_url?: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
}