import SubmitForm from "@/templates/tailspark/landing/components/submit/index";
import pageJson from "@/pagejson/en.json";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const isZh = resolvedParams.locale === 'zh';
  
  return {
    title: isZh 
      ? `MCP 服务端和客户端提交 | ${pageJson?.metadata?.title}`
      : `MCP Server&Client Submit | ${pageJson?.metadata?.title}`,
    description: isZh
      ? `与全球开发者社区分享您的 MCP 服务端或客户端。加入最大的模型上下文协议生态系统，帮助塑造 AI 集成的未来。`
      : `Share your MCP Server or Client with the global developer community. Join the largest Model Context Protocol ecosystem and help shape the future of AI integration.`,
    keywords: isZh
      ? "MCP 服务端, MCP 客户端, 模型上下文协议, Claude 集成, AI 工具, 开发者社区, 提交 MCP, MCP 生态系统"
      : "MCP Server, MCP Client, Model Context Protocol, Claude Integration, AI Tools, Developer Community, Submit MCP, MCP Ecosystem",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/submit`,
    },
  };
}

export default function SubmitPage() {
  return <SubmitForm />;
}