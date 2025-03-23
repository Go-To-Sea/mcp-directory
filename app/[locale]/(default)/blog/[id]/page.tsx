/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 17:57:20
 */
import BlogDetail from "@/templates/tailspark/landing/components/blog/detail";
import pageJson from "@/pagejson/en.json";
import type { Metadata, ResolvingMetadata } from 'next';
interface Props {
  params: Promise<{ id: Number }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const runtime = "edge";

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata>{
  const resolvedParams = await params;
  // 使用 resolvedParams.id 获取博客文章信息
  return {
    title: `博客标题 | ${pageJson?.metadata?.title}`,
    description: `博客描述`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${resolvedParams.id}`,
    },
  };
}

export default async function () {
  return <BlogDetail />;
}
