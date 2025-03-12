/*
 * @Author: YourName
 * @Date: 2025-03-07 10:00:55
 * @LastEditTime: 2025-03-13 00:16:00
 * @LastEditors: rendc
 * @Description: 
 * @FilePath: \mcp-directory\app\project\[name]\page.tsx
 * 版权声明
 */
import { notFound } from "next/navigation";
import { getProjectById, getProjectByName, getProjects } from "@/models/project";
import pageJson from "@/pagejson/en.json";
import type { Project } from "@/types/project";
import ProjectContent from "../components/ProjectContent";
import type { Metadata, ResolvingMetadata } from 'next';
import Header from "@/templates/tailspark/landing/components/header";

export const runtime = "edge";

interface Props {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  
  let project;
  if (typeof id === 'string') {
    project = await getProjectById(parseInt(id));
  } else {
    // 只解码 URL，保持下划线不变
    const decodedName = decodeURIComponent(resolvedParams.name);
    project = await getProjectByName(decodedName);
  }
  
  if (!project) return {};
  
  // 生成 canonical URL 时进行编码
  const canonicalName = encodeURIComponent(project.name);
  return {
    title: `${project.name} | ${pageJson?.metadata?.title}`,
    description: project.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers/${canonicalName}`,
    },
  };
}

// 添加一个新函数来获取相同类型的项目
async function getSimilarProjects(currentProject: Project, limit: number = 10): Promise<Project[]> {
  // 使用现有的getProjects方法，然后在客户端过滤
  const allProjects = await getProjects(1, 50); // 获取更多项目以确保有足够的同类型项目
  
  // 过滤出与当前项目类型相同的项目，并排除当前项目自身
  const similarProjects = allProjects
    .filter(project => 
      project.type === currentProject.type && 
      project.uuid !== currentProject.uuid
    )
    .slice(0, limit); // 只取前10条
    console.log('similarProjects:',allProjects, similarProjects);
  return similarProjects;
}

export default async function ProjectDetail({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  console.log('resolvedSearchParams.id:',id);
  let project;
  if (typeof id === 'string') {
    project = await getProjectById(parseInt(id));
  } else {
    // 只解码 URL，保持下划线不变
    const decodedName = decodeURIComponent(resolvedParams.name);
    project = await getProjectByName(decodedName);
  }
  
  if (!project) {
    notFound();
  }

  const similarProjects = await getSimilarProjects(project);
  const tags = typeof project.tags === 'string' ? project.tags.split(',') : project.tags;
  
  // 处理 GitHub 仓库 URL，移除查询参数
  const baseUrl = project.url?.split('?')[0];
  
  // 处理富文本中的相对路径图片
  if (project.content && baseUrl) {
    project.content = project.content.replace(
      /<img[^>]+src=["']\.\/([^"']+)["'][^>]*>/g,
      (match, relativePath) => {
        return match.replace(`./`+relativePath, `https://raw.githubusercontent.com/${project.author_name}/${project.name}/master/${relativePath}`);
      }
    );
  }
  
  project.content = `<div>${project.content}</div>`;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header header={{}}/>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProjectContent 
          project={project} 
          tags={tags || []} 
          similarProjects={similarProjects}
        />
      </div>
    </div>
  );
}