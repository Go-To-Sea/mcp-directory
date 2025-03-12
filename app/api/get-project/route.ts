import { NextResponse } from 'next/server';
import { TextDecoder } from 'util';
import MarkdownIt from 'markdown-it';
import { v4 as uuidv4 } from 'uuid';

// 加载 .env 文件
const GITHUB_TOKEN = `${process.env.GITHUB_TOKEN}`;  // GitHub 访问令牌
const REQUEST_TIMEOUT = parseInt(`${process.env.REQUEST_TIMEOUT}` || '10');  // 请求超时时间(秒)

async function requestWithRetry(url: string, headers: any, maxRetries: number = 3, timeout: number = REQUEST_TIMEOUT) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            if (attempt > 0) {
                const delay = Math.random() * 2 + 1 * attempt;
                await new Promise(resolve => setTimeout(resolve, delay * 1000));
            }

            const response = await fetch(url, {
                headers,
                signal: AbortSignal.timeout(timeout * 1000)
            });

            return response;
        } catch (e) {
            console.log(`⚠️ 请求失败 (尝试 ${attempt + 1}/${maxRetries}): ${e}`);
            if (attempt === maxRetries - 1) throw e;
        }
    }
    return null;
}

async function getReadmeContent(owner: string, repo_name: string, headers: any) {
    try {
        const api_url = `https://api.github.com/repos/${owner}/${repo_name}/readme`;
        const response = await fetch(api_url, { headers });

        if (response.ok) {
            const data = await response.json();
            const readme_content = data.content;
            // 使用 Buffer 解码 Base64 内容
            const decoded = Buffer.from(readme_content, 'base64');

            // 将解码后的内容转换为文本
            const markdown_content = new TextDecoder('utf-8', { fatal: true }).decode(decoded);

            // 使用 markdown-it 解析 Markdown
            //const md = new MarkdownIt();
            const md = new MarkdownIt({
                html: true,         // 允许 HTML 解析
                linkify: true,      // 自动解析链接
                typographer: false,  // 启用排版功能
            });
            
            const formatted_content = md.render(markdown_content);  // 转换为 HTML 格式

            return formatted_content;  // 返回 HTML 内容
        } else {
            console.log(`无法获取 README 文件: ${response.status}`);
            return null;
        }
    } catch (e) {
        console.log(`无法获取 README 文件: ${e}`);
        return null;
    }
}

function extract_tags_from_text(type: string, text: string | null): string[] {
    if (!text) {
        return [];
    }
    
    // 常见的 Minecraft 服务器相关关键词
    const keywords = [
        "minecraft", type, "plugin", "mod", "mcp", "forge", "spigot",
        "bukkit", "paper", "velocity", "proxy", "bungee", "waterfall", 
        "fabric", "multiplayer", "smp", "gamemode", "survival", "creative",
        "pvp", "pve", "economy", "permissions", "anti-cheat", "modpack"
    ];
    
    const tags: string[] = [];
    const text_lower = text.toLowerCase();
    
    for (const keyword of keywords) {
        if (text_lower.includes(keyword)) {
            tags.push(keyword);
        }
    }
    
    return tags;
}

async function getRepoData(url: string, type: string) {
    // 从 URL 中提取 owner 和 repo_name
    const urlParts = url.replace('https://github.com/', '').split('/');
    const [owner, repo_name] = urlParts;

    // 设置认证头
    const headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${GITHUB_TOKEN}`
    };

    try {
        // 获取仓库信息
        const api_url = `https://api.github.com/repos/${owner}/${repo_name}`;
        const response = await requestWithRetry(api_url, headers);
        
        if (!response || !response.ok) {
            throw new Error(`获取仓库信息失败: ${response?.status}`);
        }


        const repo = await response.json();
        
        // 获取README内容
        const readme_content = await getReadmeContent(owner, repo_name, headers);

        // 构建返回数据
        const repo_data = {
            uuid: uuidv4(),
            name: repo.name,
            title: repo.name.replace(/-/g, " ").replace(/_/g, " ").split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "),
            url: repo.html_url,
            author_name: repo.owner.login,
            author_avatar_url: repo.owner.avatar_url,
            avatar_url: repo.owner.avatar_url,
            type: type,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            status: "created",
            category: "",
            is_featured: false,
            sort: 0,
            target: "_self",
            content: readme_content,
            img_url: ""
        };

        // 动态获取标签
        let tags: string[] = [];
        
        // 1. 从仓库主题获取标签
        if (repo.topics && Array.isArray(repo.topics)) {
            tags.push(...repo.topics);
        }
        
        // 2. 从描述和README中提取关键词作为标签
        tags.push(...extract_tags_from_text(type, repo.description));
        tags.push(...extract_tags_from_text(type, readme_content));
        
        // 确保至少有基本标签
        if (tags.length === 0) {
            tags = ["MCP", type];
        }
        
        // 移除重复项，保留唯一标签
        tags = Array.from(new Set(tags));
        
        // 将标签列表转换为逗号分隔的字符串
        (repo_data as any).tags = tags.join(",");
        
        // 尝试从README中提取图片URL
        if (readme_content) {
            const img_matches = readme_content.match(/!\[.*?\]\((https?:\/\/\S+)\)/);
            if (img_matches && img_matches[1]) {
                repo_data.img_url = img_matches[1];  // 使用第一个找到的图片URL
            }
        }

        // 仅当有描述时添加描述字段
        // 添加描述和摘要字段
        const repoDataWithDesc = {
            ...repo_data,
            description: repo.description || "",
            summary: repo.description || ""
        };

        return repoDataWithDesc;
    } catch (error) {
        console.error('获取仓库数据失败:', error);
        throw error;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const repoUrl = searchParams.get('url');

    if (!repoUrl) {
        return NextResponse.json(
            { success: false, error: '缺少GitHub仓库URL参数' },
            { status: 400 }
        );
    }

    try {
        const result = await getRepoData(repoUrl, type);
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching repo data:', error);
        return NextResponse.json(
            { success: false, error: '获取仓库数据失败' },
            { status: 500 }
        );
    }
}