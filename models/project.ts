import { Project } from "@/types/project";
import { getSupabaseClient } from "./db";

export enum ProjectStatus {
  Created = "created",
  Deleted = "deleted",
}

export async function insertProject(project: Project) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("projects").insert(project);

  if (error) throw error;
  return data;
}

export async function findProjectByUuid(
  uuid: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("uuid", uuid)
    .eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;

  return data;
}

export async function findProjectByName(
  name: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("name", name)
    .eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;
  return data;
}

export async function getProjectByName(name: string): Promise<Project | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("name", name)
    .eq("status", ProjectStatus.Created)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsCount(type?: 'server' | 'client'): Promise<number> {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("projects")
    .select("count")
    .eq("status", ProjectStatus.Created);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getProjectsCountByCategory(
  category: string
): Promise<number> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("count")
    .eq("category", category)
    .eq("status", ProjectStatus.Created);

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getProjectsByCategory(
  category: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getFeaturedProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    // .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (error) return [];
  console.log('getFeaturedProjects.data====',data);
  return data;
}

export async function getRandomProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data.sort(() => Math.random() - 0.5);
}

export async function getProjectsWithKeyword(
  keyword: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .or(
      `name.ilike.%${keyword}%,title.ilike.%${keyword}%,description.ilike.%${keyword}%`
    )
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsWithTag(
  tag: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .ilike("tags", `%${tag}%`) // 使用 ilike 进行模糊匹配，确保能匹配逗号分隔的字符串
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  // 进一步过滤，确保完全匹配（避免部分匹配的问题）
  return data.filter(project => {
    if (!project.tags) return false;
    const tagArray = project.tags.split(',').map((t: string) => t.trim());
    return tagArray.includes(tag);
  });
}

export async function getProjectsWithoutSummary(
  page: number,
  limit: number
): Promise<Project[]> {
  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 20;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .is("summary", null)
    .eq("status", ProjectStatus.Created)
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function updateProject(uuid: string, project: Partial<Project>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("uuid", uuid);

  if (error) throw error;

  return data;
}

// 添加 getAllProjectTags 方法的导出
export async function getAllProjectTags(): Promise<{ [key: string]: number }> {
  const supabase = getSupabaseClient();
  
  // 获取所有项目的 tags
  const { data, error } = await supabase
    .from("projects")
    .select("tags")
    .eq("status", ProjectStatus.Created)
    .not("tags", "is", null);

  if (error || !data) return {};

  // 统计标签数量
  return data.reduce((acc: { [key: string]: number }, project) => {
    if (project.tags) {
      const tagArray = project.tags.split(',').map((tag: string) => tag.trim());
      tagArray.forEach((tag: string) => {
        if (tag) {
          acc[tag] = (acc[tag] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});
}
