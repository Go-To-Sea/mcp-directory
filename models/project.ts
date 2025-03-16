import { Project } from "@/types/project";
import { getSupabaseClient } from "./db";

export enum ProjectStatus {
  Active = "active",
  Deleted = "deleted",
}

export async function insertProject(project: Project) {
  const supabase = getSupabaseClient();
  
  // 处理时间戳字段
  const processedProject = {
    ...project,
    created_at: project.created_at ? new Date(project.created_at).toISOString() : new Date().toISOString(),
    updated_at: project.updated_at ? new Date(project.updated_at).toISOString() : new Date().toISOString()
  };
  
  // 先查询是否存在相同 URL 的项目
  const { data: existingProject } = await supabase
    .from("projects")
    .select("uuid")
    .eq("url", project.url)
    .maybeSingle();

  // 如果存在相同 URL 的项目，则更新
  if (existingProject?.uuid) {
    const updateData = {
      name: processedProject.name,
      title: processedProject.title,
      description: processedProject.description,
      content: processedProject.content,
      img_url: processedProject.img_url,
      tags: processedProject.tags,
      type: processedProject.type,
      url: processedProject.url,
      github_url: processedProject.github_url,
      author_name: processedProject.author_name,
      author_avatar_url: processedProject.author_avatar_url,
      status: processedProject.status,
      updated_at: processedProject.updated_at,
      user_submit:true,
      submit_time: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("uuid", existingProject.uuid)
      .select();

    if (error) throw error;
    return data;
  }
  
  // 不存在则执行插入操作
  const { data, error } = await supabase
    .from("projects")
    .insert(processedProject)
    .select();

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
    // .eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;

  return data;
}

export async function findMaxSort(): Promise<number> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("sort")
    .order("sort", { ascending: true })
    .limit(1)
    .single();

  if (!data || !data.sort) return 0;
  return data.sort + 1;
}

export async function findProjectByName(
  name: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("name", name)
    // .eq("status", ProjectStatus.Created)
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
    // .eq("status", ProjectStatus.Created)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    // .eq("status", ProjectStatus.Created)
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
    // .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: true })
    // .order("created_at", { ascending: true })
    // .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsCount(type?: 'server' | 'client'): Promise<number> {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("projects")
    .select("count")
    // .eq("status", ProjectStatus.Created);

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
    // .eq("status", ProjectStatus.Created);

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getProjectsByCategory(
  category: string,
  page: number,
  limit: number,
  type?: 'server' | 'client'
): Promise<Project[]> {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .order("sort", { ascending: true });

  // 如果指定了 type，添加类型筛选
  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

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
    // .eq("is_featured", true) //TODO
    // .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: true })
    // .order("created_at", { ascending: true })
    .range((page - 1) * limit, page * limit - 1);
  if (error) return [];
  console.log('getFeaturedProjects.data====',data);
  return data;
}

export async function getUsersNewSubmitList(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_submit", true)
    .order("submit_time", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];
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
    // .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: true })
    // .order("created_at", { ascending: true })
    // .range((page - 1) * limit, page * limit - 1);

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
    // .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: true })
    // .order("created_at", { ascending: true })
    // .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsWithTag(
  tag: string,
  page: number,
  limit: number,
  type?: 'server' | 'client'
): Promise<Project[]> {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("projects")
    .select("*")
    .ilike("tags", `%${tag}%`)
    .order("sort", { ascending: true });

  // 只有当传入 type 参数时才添加类型筛选
  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) return [];
  
  return data;
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
    // .eq("status", ProjectStatus.Created)
    // .range((page - 1) * limit, page * limit - 1);

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
export async function getAllProjectTags(type?: 'server' | 'client'): Promise<{ [key: string]: { name: string; count: number; type: string } }> {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from("projects")
    .select("tags, type")
    // .eq("status", ProjectStatus.Created)
    .not("tags", "is", null);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error || !data) return {};

  // 修改标签处理逻辑
  const tagsMap = data.reduce((acc: { [key: string]: { name: string; count: number; type: string } }, project) => {
    if (project.tags) {
      // 处理可能的多层嵌套分割
      const tagArray = project.tags
        .split(',')
        .map((tag: string) => tag.trim().toLowerCase()) // 统一转换为小写
        .filter((tag: any)  => tag); // 过滤空标签

      tagArray.forEach((tag: string) => {
        const normalizedTag = tag.trim();
        if (normalizedTag) {
          if (!acc[normalizedTag]) {
            acc[normalizedTag] = { 
              name: normalizedTag,
              count: 0, 
              type: project.type || '' 
            };
          }
          acc[normalizedTag].count += 1;
        }
      });
    }
    return acc;
  }, {});

  // 排序逻辑保持不变
  const sortedTags = Object.entries(tagsMap)
    .sort(([, a], [, b]) => b.count - a.count)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: { name: string; count: number; type: string } });

  return sortedTags;
}
