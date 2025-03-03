import {
  ProjectStatus,
  findProjectByName,
  insertProject,
  updateProject,
} from "@/models/project";

import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";
import { Project } from "@/types/project";
import { extractProjectPrompt } from "@/services/prompts/extract_project";
import { genUuid } from "@/utils";
import { getIsoTimestr } from "@/utils/time";
import { getOpenAIClient } from "@/services/llms/openai";
import { readUrl } from "./reader/jina";
import { summarizeProjectPrompt } from "./prompts/summarize_project";

export function parseProject(project: Project): Project | undefined {
  try {
    if (!project || !project.url) {
      return;
    }

    if (!project.type) {
      return;
    }

    if (!project.url.startsWith("https://github.com")) {
      return;
    }

    if (!project.name) {
      const urlParts = project.url.split("/");
      project.name = urlParts[urlParts.length - 1];
      if (!project.name) {
        return;
      }
    }

    if (!project.author_name) {
      const urlParts = project.url.split("/");
      if (urlParts.length > 2) {
        project.author_name = urlParts[urlParts.length - 2];
      }
    }

    if (!project.title) {
      project.title = project.name
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return project;
  } catch (e) {
    console.log("parse project failed", e);
    return;
  }
}

export async function extractProject(content: string): Promise<Project> {
  try {
    const prompt = extractProjectPrompt.replace("{content}", content);
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    const project = JSON.parse(result || "{}");
    if (!project.name || !project.title || !project.description) {
      throw new Error("project is invalid");
    }

    return project;
  } catch (e) {
    console.error("extract project failed: ", e);
    throw e;
  }
}

export async function sumProject(project: Project): Promise<Project> {
  try {
    if (!project || !project.uuid || !project.name || !project.url) {
      throw new Error("invalid project");
    }

    let content_url = project.url;

    if (content_url.startsWith("https://github.com")) {
      const githubUrl = new URL(content_url);
      const [owner, repo] = githubUrl.pathname.slice(1).split("/");
      if (owner === "modelcontextprotocol") {
        content_url = `https://raw.githubusercontent.com/${owner}/servers/main/src/${project.name}/README.md`;
      } else {
        content_url = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
      }
    }

    console.log("project", project, content_url);

    const projectUpdatedAt = project.updated_at;

    if (!project.content && content_url) {
      const post = await readUrl(content_url);
      console.log("post", post);
      if (post && post.content && post.content.length > 100) {
        project.content = post.content;
        project.updated_at = getIsoTimestr();
      }
    }

    if (!project.summary && project.content) {
      const summarizedProject = await summarizeProject(project);
      project.category = summarizedProject.category;
      project.tags = Array.isArray(summarizedProject.tags)
        ? summarizedProject.tags.join(",")
        : summarizedProject.tags;
      project.summary = summarizedProject.summary;
      project.target = "_self";
      project.updated_at = getIsoTimestr();
    }

    if (projectUpdatedAt !== project.updated_at) {
      await updateProject(project.uuid, project);
    }

    return project;
  } catch (e) {
    console.log("summarize project failed: ", e);
    return project;
  }
}

export async function summarizeProject(project: Project): Promise<Project> {
  try {
    const prompt = summarizeProjectPrompt.replace(
      "{project}",
      JSON.stringify(project)
    );
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    console.log("summarize project result: ", result);

    const summarizedProject = JSON.parse(result || "{}");
    if (!summarizedProject.summary) {
      throw new Error("summary is invalid");
    }

    return summarizedProject;
  } catch (e) {
    console.error("summarize project failed: ", e);
    throw e;
  }
}

export async function saveProject(
  project: Project
): Promise<Project | undefined> {
  try {
    if (!project.name) {
      throw new Error("invalid project");
    }

    const existProject = await findProjectByName(project.name);

    if (existProject && existProject.uuid) {
      project.uuid = existProject.uuid;
      project.created_at = existProject.created_at;
      await updateProject(existProject.uuid, project);
      return { ...existProject, ...project };
    }

    const created_at = getIsoTimestr();

    project.uuid = genUuid();
    project.created_at = created_at;
    project.updated_at = created_at;
    project.status = ProjectStatus.Created;
    project.target = "_self";
    project.is_featured = true;
    project.sort = 1;

    await insertProject(project);

    return project;
  } catch (e) {
    console.error("save project failed: ", e);
    throw e;
  }
}
