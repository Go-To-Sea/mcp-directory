import { Comment } from "@/types/comment";
import { getSupabaseClient } from "./db";
import { v4 as uuidv4 } from 'uuid';

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const supabase = getSupabaseClient();
  const uuid = uuidv4();
  
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        ...comment,
        uuid,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('数据库插入错误:', error);
      throw new Error('评论提交失败，请稍后重试');
    }
    
    return data;
  } catch (err) {
    console.error('创建评论失败:', err);
    throw err;
  }
}

export async function getProjectComments(projectId: number): Promise<Comment[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      replies (*)
    `)
    .eq("project_id", projectId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}