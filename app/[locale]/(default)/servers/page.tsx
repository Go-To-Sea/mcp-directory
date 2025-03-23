/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 23:28:13
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 22:54:07
 */
import Servers from "@/templates/tailspark/landing/components/servers";
import { getCategories } from "@/models/category";
import { Project } from "@/types/project";
import pageJson from "@/pagejson/en.json";
import { ClassMenus } from "@/types/project";
import {
    getFeaturedProjects,
    getProjectsCount,
    getProjectsWithKeyword,
    getProjectsWithTag,
    getAllProjectTags,
    getProjectsByCategory
} from "@/models/project";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `Discover MCP Servers | ${pageJson?.metadata?.title}`,
    description: `Find the best MCP servers for your needs.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers`,
    },
  };
}

// 移除顶层 await
export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q,category } = await searchParams;
  let projects: Project[] | any[] = [];
  
  // 获取所有分类
  const categories = await getCategories(1, 100,'server');
  
   if (category) {
    projects = await getProjectsByCategory(category as string,1, 500,'server');
  }else if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 500);
  } else {
    projects = await getFeaturedProjects(1, 500);
  }
  const projectsCount = await getProjectsCount('server');

  // 转换为 ClassMenus 组件需要的格式，使用 category
  const classMenus: ClassMenus[] = categories.map(category => ({
    ...category,
    name: category.name,
    href: `/servers?category=${encodeURIComponent(category.name)}`
  }));

  return (
    <Servers 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
    />
  );
}

