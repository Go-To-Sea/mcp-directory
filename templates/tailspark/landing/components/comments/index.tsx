"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createComment, getProjectComments } from "@/models/comment";
import { Comment } from "@/types/comment";
import { v4 as uuidv4 } from "uuid";
import { toast, Toaster } from "sonner";
interface CommentsProps {
  projectId: number;
}

export default function Comments({ projectId }: CommentsProps) {

  const t = useTranslations("comments");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getProjectComments(projectId);
        setComments(data);
      } catch (err) {
        toast.error("加载评论失败");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !userId || !user || !content.trim()) return;

    try {
      const newComment = await createComment({
        content: content.trim(),
        project_id: projectId + "", // 直接传入 number 类型
        user_id: userId,
        user_nickname: user.firstName || user.username || "",
        user_avatar_url: user.imageUrl || "",
        uuid: uuidv4(),
      });

      setComments((prev) => [newComment, ...prev]);
      setContent("");
      toast.success("评论发布成功！");
    } catch (err) {
      console.error("提交评论失败:", err);
      toast.error("评论提交失败，请稍后重试");
    }
  };

  // 移除 error 相关的渲染逻辑
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // 删除这个 if 判断，因为我们已经移除了 error 状态
  // if (error) {
  //   return <div className="text-center py-8 text-red-500">{error}</div>;
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("title")}
        </h2>
      </div>

      {isLoaded && userId ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary focus:ring-primary dark:bg-gray-800 dark:text-gray-200 resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          {t("pleaseLogin")}
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.uuid} className="flex gap-4">
            <img
              src={comment.user_avatar_url || "/avatar-placeholder.png"}
              alt={comment.user_nickname}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {comment.user_nickname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at!).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" />
    </motion.div>
  );
}
