import Faq from "../components/faq";
import Hero from "../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../components/projects";
import FooterInfo from "../components/footerInfo";
import Search from "../components/search";
import AnimatedBackground from "../components/animatedBackground";

export default function ({
  page,
  projects,
  projectsCount,
}: {
  page: Page;
  projects: Project[];
  projectsCount: number;
}) {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* 背景动画 */}
      <AnimatedBackground />
      {/* 欢迎和介绍词 */}
      <div className="mx-auto max-w-7xl  animate-fade-out  delay-3000 duration-2000 mt-12 pt-80 pb-80 to-[#eaab9480]/50  w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-transparent ">
        <div className="text-center">
          {/* 渐变标题 */}
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d85a2c80] to-[#f36f3f80] mb-4">
            Welcome to the MCP Tools Station!
          </h1>
          <p className="text-lg text-white mb-8 px-20 mt-10">
            Here, we provide a comprehensive suite of tools designed specifically for the Multi-Purpose Computing Platform (MCP). Whether you are a developer, a designer, or just looking for efficient solutions, our tools are tailored to enhance your productivity and streamline your workflow. Explore our collection and unlock the full potential of your MCP environment.
          </p>
          <a href="#222" className="p-5 pt-2 pb-2 mt-8 bg-[#d85a2c80] text-[#e5e5e5]">Explore Now</a>
        </div>
      </div>
      {/* 现有页面内容 */}
      <div className="relative z-10" id="222">
        {page.hero && <Hero hero={page.hero} count={projectsCount} />}
        <Search />
        <Projects projects={projects} />
        {page.faq && <Faq section={page.faq} />}
        {/* <FooterInfo /> */}
      </div>
    </div>
  );
}