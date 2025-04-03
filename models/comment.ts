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
        project_id: comment.project_id, 
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
  try {
    // 先获取评论
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", projectId)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (commentsError) {
      console.error('获取评论列表失败:', commentsError);
      return [];
    }

    // 再获取回复
    if (comments && comments.length > 0) {
      const { data: replies, error: repliesError } = await supabase
        .from("replies")
        .select("*")
        .in("comment_id", comments.map(c => c.id))
        .eq("status", "active");

      if (!repliesError && replies) {
        // 将回复数据添加到对应的评论中
        return comments.map(comment => ({
          ...comment,
          replies: replies.filter(reply => reply.comment_id === comment.id)
        }));
      }
    }
    
    return comments || [];
  } catch (err) {
    console.error('获取评论列表错误:', err);
    return [];
  }
}