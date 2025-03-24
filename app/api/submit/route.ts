import { parseProject, saveProject } from "@/services/project";
import { respData, respErr } from "@/utils/resp";
import { NextResponse } from 'next/server';
import { Project } from "@/types/project";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const project = await req.json();
    const gitHubUrl = project.url;
    if (!gitHubUrl) {
      return respErr("invalid gitHubUrl");
    }
    // 调用get-project接口获取project信息
    const type = project.type || 'server'; // 默认为server类型
    
    // 获取请求的协议（http 或 https）
    const protocol = req.headers.get('x-forwarded-proto') || 'http'; // 默认使用 http
    // 获取请求的主机和端口
    const host = req.headers.get('host'); // 包括主机和端口，如 'localhost:3000'

    const url = '/api/get-project';
    // 拼接成完整的访问地址
    const apiUrl = `${protocol}://${host}${url}?url=${gitHubUrl}&type=${type}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return respErr(`获取项目信息失败: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(result);
    if (!result.success || !result.data) {
      return respErr("获取项目信息失败");
    }
    
    // 合并获取到的项目信息
    const projectData = { ...project, ...result.data };
    
    const parsedProject = parseProject(projectData);

    // 确保 parsedProject 不为 undefined 后再传入 saveProject
    const savedProject = parsedProject ? await saveProject(parsedProject) : undefined;
    if (!savedProject) {
      return respErr("save project failed");
    }

    return respData(savedProject);

    return NextResponse.json({
      parsedProject,
    });

    // const parsedProject = parseProject(project);
    // if (!parsedProject) {
    //   return respErr("invalid project");
    // }

    // const savedProject = await saveProject(parsedProject);
    // if (!savedProject) {
    //   return respErr("save project failed");
    // }

    // return respData(savedProject);
  } catch (e) {
    console.log("submit project failed", e);
    return respErr("submit project failed");
  }
}
