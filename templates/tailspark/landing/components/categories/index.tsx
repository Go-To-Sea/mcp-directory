/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-17 23:36:08
 */
import Faq from "../../components/faq";
import Hero from "../../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../../components/projects";
import Search from "../../components/search";
import { ClassMenus } from "@/types/project";

export default function ({
  page,
  projects,
  projectsCount,
  tag
}: {
  page: any;
  projects: Project[];
  projectsCount: number;
  tag: string
}) {
  return (
    <div className="relative">
      <div className="fixed inset-0 w-full flex justify-center">
        <div className="w-full max-w-[1920px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" className="-z-50 absolute hidden opacity-25 [mask-image:linear-gradient(to_right,white,transparent,transparent,white)] lg:block"><g clipPath="url(#clip0_4_5)"><rect width="1920" height="1080"></rect><line y1="49.5" x2="1920" y2="49.5" className="stroke-muted-foreground"></line><line y1="99.5" x2="1920" y2="99.5" className="stroke-muted-foreground"></line><line y1="149.5" x2="1920" y2="149.5" className="stroke-muted-foreground"></line><line y1="199.5" x2="1920" y2="199.5" className="stroke-muted-foreground"></line><line y1="249.5" x2="1920" y2="249.5" className="stroke-muted-foreground"></line><line y1="299.5" x2="1920" y2="299.5" className="stroke-muted-foreground"></line><line y1="349.5" x2="1920" y2="349.5" className="stroke-muted-foreground"></line><line y1="399.5" x2="1920" y2="399.5" className="stroke-muted-foreground"></line><line y1="449.5" x2="1920" y2="449.5" className="stroke-muted-foreground"></line><line y1="499.5" x2="1920" y2="499.5" className="stroke-muted-foreground"></line><line y1="549.5" x2="1920" y2="549.5" className="stroke-muted-foreground"></line><line y1="599.5" x2="1920" y2="599.5" className="stroke-muted-foreground"></line><line y1="649.5" x2="1920" y2="649.5" className="stroke-muted-foreground"></line><line y1="699.5" x2="1920" y2="699.5" className="stroke-muted-foreground"></line><line y1="749.5" x2="1920" y2="749.5" className="stroke-muted-foreground"></line><line y1="799.5" x2="1920" y2="799.5" className="stroke-muted-foreground"></line><line y1="849.5" x2="1920" y2="849.5" className="stroke-muted-foreground"></line><line y1="899.5" x2="1920" y2="899.5" className="stroke-muted-foreground"></line><line y1="949.5" x2="1920" y2="949.5" className="stroke-muted-foreground"></line><line y1="999.5" x2="1920" y2="999.5" className="stroke-muted-foreground"></line><line y1="1049.5" x2="1920" y2="1049.5" className="stroke-muted-foreground"></line><g clipPath="url(#clip1_4_5)"><line x1="49.6133" y1="3.99995" x2="49.7268" y2="1084" className="stroke-muted-foreground"></line><line x1="99.7275" y1="3.99995" x2="99.8411" y2="1084" className="stroke-muted-foreground"></line><line x1="149.841" y1="3.99995" x2="149.954" y2="1084" className="stroke-muted-foreground"></line><line x1="199.954" y1="3.99995" x2="200.068" y2="1084" className="stroke-muted-foreground"></line><line x1="250.067" y1="3.99995" x2="250.181" y2="1084" className="stroke-muted-foreground"></line><line x1="300.182" y1="3.99995" x2="300.295" y2="1084" className="stroke-muted-foreground"></line><line x1="350.295" y1="3.99995" x2="350.408" y2="1084" className="stroke-muted-foreground"></line><line x1="400.408" y1="3.99995" x2="400.522" y2="1084" className="stroke-muted-foreground"></line><line x1="450.521" y1="3.99995" x2="450.635" y2="1084" className="stroke-muted-foreground"></line><line x1="500.636" y1="3.99995" x2="500.749" y2="1084" className="stroke-muted-foreground"></line><line x1="550.749" y1="3.99995" x2="550.863" y2="1084" className="stroke-muted-foreground"></line><line x1="600.862" y1="3.99995" x2="600.976" y2="1084" className="stroke-muted-foreground"></line><line x1="650.976" y1="3.99995" x2="651.089" y2="1084" className="stroke-muted-foreground"></line><line x1="701.09" y1="3.99995" x2="701.203" y2="1084" className="stroke-muted-foreground"></line><line x1="751.203" y1="3.99995" x2="751.317" y2="1084" className="stroke-muted-foreground"></line><line x1="801.316" y1="3.99995" x2="801.43" y2="1084" className="stroke-muted-foreground"></line><line x1="851.43" y1="3.99995" x2="851.543" y2="1084" className="stroke-muted-foreground"></line><line x1="901.544" y1="3.99995" x2="901.657" y2="1084" className="stroke-muted-foreground"></line><line x1="951.657" y1="3.99995" x2="951.771" y2="1084" className="stroke-muted-foreground"></line><line x1="1001.77" y1="3.99995" x2="1001.88" y2="1084" className="stroke-muted-foreground"></line><line x1="1051.88" y1="3.99995" x2="1052" y2="1084" className="stroke-muted-foreground"></line><line x1="1102" y1="3.99995" x2="1102.11" y2="1084" className="stroke-muted-foreground"></line><line x1="1152.11" y1="3.99995" x2="1152.22" y2="1084" className="stroke-muted-foreground"></line><line x1="1202.22" y1="3.99995" x2="1202.34" y2="1084" className="stroke-muted-foreground"></line><line x1="1252.34" y1="3.99995" x2="1252.45" y2="1084" className="stroke-muted-foreground"></line><line x1="1302.45" y1="3.99995" x2="1302.57" y2="1084" className="stroke-muted-foreground"></line><line x1="1352.57" y1="3.99995" x2="1352.68" y2="1084" className="stroke-muted-foreground"></line><line x1="1402.68" y1="3.99995" x2="1402.79" y2="1084" className="stroke-muted-foreground"></line><line x1="1452.79" y1="3.99995" x2="1452.91" y2="1084" className="stroke-muted-foreground"></line><line x1="1502.91" y1="3.99995" x2="1503.02" y2="1084" className="stroke-muted-foreground"></line><line x1="1553.02" y1="3.99995" x2="1553.13" y2="1084" className="stroke-muted-foreground"></line><line x1="1603.13" y1="3.99995" x2="1603.25" y2="1084" className="stroke-muted-foreground"></line><line x1="1653.25" y1="3.99995" x2="1653.36" y2="1084" className="stroke-muted-foreground"></line><line x1="1703.36" y1="3.99995" x2="1703.47" y2="1084" className="stroke-muted-foreground"></line><line x1="1753.47" y1="3.99995" x2="1753.59" y2="1084" className="stroke-muted-foreground"></line><line x1="1803.59" y1="3.99995" x2="1803.7" y2="1084" className="stroke-muted-foreground"></line><line x1="1853.7" y1="3.99995" x2="1853.81" y2="1084" className="stroke-muted-foreground"></line><line x1="1903.81" y1="3.99995" x2="1903.93" y2="1084" className="stroke-muted-foreground"></line></g></g><defs><clipPath id="clip0_4_5"><rect width="1920" height="1080" fill="#000000"></rect></clipPath><clipPath id="clip1_4_5"><rect width="1920" height="1080" fill="#000000" transform="translate(-1 4)"></rect></clipPath></defs></svg>
        </div>
      </div>

      {/* 添加欢迎标题部分 */}
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
            MCP Server Categories
          </h1>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 inline-block">
              Current Categories: <span className="text-primary font-medium">{tag || 'All'}</span>
            </h2>
          </div>
         
        </div>
      </div>

      <div className="relative z-10">
        <Projects projects={projects} />
      </div>
    </div>
  );
}
