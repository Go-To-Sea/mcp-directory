export interface Comment {
  id: number;
  uuid: string;
  user_id: number;
  user_nickname?: string;
  user_avatar_url?: string;
  project_id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
}