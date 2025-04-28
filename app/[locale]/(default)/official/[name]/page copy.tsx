/*
 * @Author: YourName
 * @Date: 2025-03-07 10:00:55
 * @LastEditTime: 2025-03-16 19:53:06
 * @LastEditors: rendc
 * @Description: 
 * @FilePath: \mcp-directory\app\project\[name]\page.tsx
 * 版权声明
 */
import { notFound } from "next/navigation";
import { getProjectById, getProjectByName, getProjects } from "@/models/project";
import pageJson from "@/pagejson/en.json";
import type { Project } from "@/types/project";
import ProjectContent from "@/templates/tailspark/landing/components/project/detail";
import type { Metadata, ResolvingMetadata } from 'next';
import Header from "@/templates/tailspark/landing/components/header";

import { officials } from "@/templates/tailspark/landing/components/projects";
export const runtime = "edge";

interface Props {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 确保 officials 是一个数组
const officialsList = Array.isArray(officials) ? officials : [];


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  
  let project = officialsList.find((p:any) => p.name.toLowerCase() === resolvedParams.name.toLowerCase());
  if (!project) return {};
  
  // 生成 canonical URL 时进行编码
  const canonicalName = encodeURIComponent(project.name);
  return {
    title: `Discover MCP Clients For ${project.name} | ${pageJson?.metadata?.title}`,
    description: project.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers/${canonicalName}`,
    },
    keywords: [
      'MCP Server',
      'MCP Servers',
      'Model Context Protocol',
      'MCP Resources',
      'MCP.ad',
      'Discover MCP Servers',
      'MCP Server Detail'
    ],
  };
}

// 添加一个新函数来获取相同类型的项目
async function getSimilarProjects(currentProject: Project, limit: number = 10) {
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
  console.log('ProjectDetailparams:',params);ProjectDetail
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // const id = resolvedSearchParams?.id;
  
  // 从缓存的 officials 数组中查找匹配的数据
  const decodedName = decodeURIComponent(resolvedParams.name);
  const project = officialsList.find((p:any) => p.name.toLowerCase() === decodedName.toLowerCase());

  // 如果缓存中没有找到，则返回 404
  // 注释掉原有的动态获取逻辑
  /*
  if (typeof id === 'string') {
    project = await getProjectById(parseInt(id));
  } else {
    // 只解码 URL，保持下划线不变
    const decodedName = decodeURIComponent(resolvedParams.name);
    project = await getProjectByName(decodedName);
  }
  */
  
  if (!project) {
    notFound();
  }

  // const similarProjects = await getSimilarProjects(project );
  const tags = typeof project.tags === 'string' ? project.tags.split(',') : project.tags;
  

  project.content = `<div>${project.content}</div>`;
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProjectContent 
          project={project} 
          tags={tags || []} 
          similarProjects={[]}
          pathPrefix="/servers"
        />
      </div>
    </div>
  );
}