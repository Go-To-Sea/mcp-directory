"use client";

import SubmitForm from "@/templates/tailspark/landing/components/header/submitModal";
import { useEffect, useState } from "react";
import { getFeaturedProjects } from "@/models/project";

export default function SubmitPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getFeaturedProjects(1, 100);
        setProjects(data as any);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="relative overflow-hidden">

      <div className="mx-auto  w-full min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6 mt-[-90px]">
            <div className="relative z-20">
              <a 
                target="_blank" 
                href="https://www.producthunt.com/posts/mcp-servers-2"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light" 
                  alt="MCP Servers - A MCP Servers resource navigation station" 
                  width="250" 
                  height="54" 
                />
              </a>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
            Submit Your MCP Project
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-[#898989] dark:text-white mb-6 sm:mb-8 px-2 sm:px-8 md:px-20">
            Join our growing community of MCP tools. Share your project with developers worldwide and help shape the future of MCP ecosystem.
          </p>
        </div>
      </div>

      {/* 原有的表单部分 */}
      <div className="" style={{marginTop:'-150px',paddingBottom:'70px'}}>
        <div className="w-full ">
          <SubmitForm projects={projects}/>
        </div>
      </div>
    </div>
  );
}