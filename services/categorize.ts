import { Project } from "@/types/project";

/**
 * 根据项目特征自动分类
 * @param project 项目信息
 * @returns 分类名称
 */
export function categorizeProject(project: Project): string {
  // 默认分类
  let category = "other_projects_alphabetical_order";
  
  // 根据项目类型选择不同的分类逻辑
  if (project.type === 'client') {
    return categorizeClientProject(project);
  }
  
  // 以下是server类型项目的分类逻辑
  // 提取可用于分类的信息
  const url = project.url?.toLowerCase() || "";
  const name = project.name?.toLowerCase() || "";
  const title = project.title?.toLowerCase() || "";
  const description = project.description?.toLowerCase() || "";
  const author = project.author_name?.toLowerCase() || "";
  const content = project.content?.toLowerCase() || "";
  
  // 组合所有文本以便进行关键词匹配
  const allText = `${url} ${name} ${title} ${description} ${author} ${content}`;
  
  // 大公司和知名组织
  const bigCompaniesKeywords = [
    "aws", "amazon", "microsoft", "azure", "google", "cloudflare", 
    "jetbrains", "apify", "quarkiverse", "langfuse", "qdrant", 
    "datalayer", "speakeasy", "acryldata", "illuminaresolutions", "box"
  ];
  
  // 知名开发者和高影响力项目
  const wellKnownDevelopersKeywords = [
    "modelcontextprotocol", "smithery-ai", "exa-labs", "create-mcp-server", 
    "webcontainer", "solana", "metaplex", "aldrin-labs"
  ];
  
  // 企业工具和集成
  const enterpriseToolsKeywords = [
    "azure-devops", "onenote", "gmail", "google-workspace", "google-maps", 
    "github", "trello", "claude", "tavily"
  ];
  
  // 电商与CMS
  const eCommerceKeywords = ["shopify", "woocommerce", "magento", "cms", "e-commerce", "ecommerce"];
  
  // 文档与知识管理
  const documentationKeywords = ["notion", "obsidian", "documentation", "knowledge", "wiki"];
  
  // 数据库与存储
  const databasesKeywords = [
    "mysql", "postgresql", "postgres", "redis", "sqlite", "duckdb", 
    "filesystem", "storage", "database", "db"
  ];
  
  // AI/ML 基础设施
  const aiMlKeywords = ["claude", "deepseek", "ollama", "mistral", "openai", "gemini", "ai", "ml"];
  
  // 开发工具链
  const developmentToolchainsKeywords = [
    "shell", "command-executor", "computer-control", "memory-file", 
    "macos-defaults", "docker", "kubernetes", "development", "toolchain"
  ];
  
  // 社区与框架
  const communityKeywords = [
    "hub", "starter", "template", "framework", "awesome", "community"
  ];
  
  // 根据关键词匹配进行分类
  if (bigCompaniesKeywords.some(keyword => allText.includes(keyword))) {
    category = "big_companies_and_well_known_organizations";
  } else if (wellKnownDevelopersKeywords.some(keyword => allText.includes(keyword))) {
    category = "well_known_developers_and_high_impact_projects";
  } else if (enterpriseToolsKeywords.some(keyword => allText.includes(keyword))) {
    category = "enterprise_tools_and_integrations";
  } else if (eCommerceKeywords.some(keyword => allText.includes(keyword))) {
    category = "e_commerce_and_cms";
  } else if (documentationKeywords.some(keyword => allText.includes(keyword))) {
    category = "documentation_and_knowledge_management";
  } else if (databasesKeywords.some(keyword => allText.includes(keyword))) {
    category = "databases_and_storage";
  } else if (aiMlKeywords.some(keyword => allText.includes(keyword))) {
    category = "ai_ml_infrastructure";
  } else if (developmentToolchainsKeywords.some(keyword => allText.includes(keyword))) {
    category = "development_toolchains";
  } else if (communityKeywords.some(keyword => allText.includes(keyword))) {
    category = "community_and_frameworks";
  }
  
  return category;
}

/**
 * 对client类型项目进行分类
 * @param project 项目信息
 * @returns 分类名称
 */
function categorizeClientProject(project: Project): string {
  // 默认分类
  let category = "mcp_clients_other";
  
  // 提取可用于分类的信息
  const url = project.url?.toLowerCase() || "";
  const name = project.name?.toLowerCase() || "";
  const title = project.title?.toLowerCase() || "";
  const description = project.description?.toLowerCase() || "";
  const author = project.author_name?.toLowerCase() || "";
  const content = project.content?.toLowerCase() || "";
  
  // 组合所有文本以便进行关键词匹配
  const allText = `${url} ${name} ${title} ${description} ${author} ${content}`;
  
  // 大公司关键词
  const bigCompaniesKeywords = [
    "aws", "amazon", "microsoft", "azure", "google", "cloudflare", 
    "jetbrains", "apify", "quarkiverse", "langfuse", "qdrant", 
    "datalayer", "speakeasy", "acryldata", "illuminaresolutions", "box",
    "meta", "facebook", "apple", "netflix", "uber", "airbnb", "twitter", "linkedin"
  ];
  
  // 框架相关关键词
  const frameworksKeywords = [
    "react", "vue", "angular", "svelte", "nextjs", "nuxt", "gatsby", 
    "framework", "library", "sdk", "toolkit", "boilerplate", "starter"
  ];
  
  // 特定语言相关关键词
  const languageSpecificKeywords = [
    "javascript", "typescript", "python", "java", "c#", "csharp", "go", "golang", 
    "rust", "ruby", "php", "swift", "kotlin", "dart", "flutter", "scala", "clojure"
  ];
  
  // AI集成相关关键词
  const aiIntegrationKeywords = [
    "ai", "ml", "machine learning", "artificial intelligence", "llm", "gpt", 
    "openai", "claude", "anthropic", "gemini", "mistral", "ollama", "huggingface",
    "langchain", "llamaindex", "embedding", "vector", "semantic", "rag"
  ];
  
  // 工具相关关键词
  const toolsKeywords = [
    "tool", "utility", "plugin", "extension", "addon", "cli", "command line",
    "editor", "ide", "vscode", "intellij", "webstorm", "pycharm", "automation",
    "workflow", "pipeline", "ci/cd", "devops", "testing", "debug", "analyzer"
  ];
  
  // 根据关键词匹配进行分类
  if (bigCompaniesKeywords.some(keyword => allText.includes(keyword))) {
    category = "mcp_clients_big_companies";
  } else if (frameworksKeywords.some(keyword => allText.includes(keyword))) {
    category = "mcp_clients_frameworks";
  } else if (languageSpecificKeywords.some(keyword => allText.includes(keyword))) {
    category = "mcp_clients_language_specific";
  } else if (aiIntegrationKeywords.some(keyword => allText.includes(keyword))) {
    category = "mcp_clients_ai_integration";
  } else if (toolsKeywords.some(keyword => allText.includes(keyword))) {
    category = "mcp_clients_tools";
  }
  
  return category;
}