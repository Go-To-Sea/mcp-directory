/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-03 23:32:09
 */
"use client";

import { Project } from "@/types/project";
import ProjectItem from "./item";
import ClassMenus from "./classMenus";

export default (props: {
  projects: Project[];
  loading?: boolean;
  showMenus?: boolean;
}) => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4 ">
      {props.showMenus && <ClassMenus />}
        {!props.loading ? (
          <div className="flex flex-wrap justify-between gap-5 md:gap-5 ">
            {props.projects.map((item: Project, idx: number) => {
              return (
                <div key={idx} className="w-full md:w-1/2 lg:w-1/4">
                  <ProjectItem project={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto text-center">Loading data...</div>
        )}
      </div>
    </section>
  );
};