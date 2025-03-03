/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-04 02:46:03
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
      <div className="mx-auto max-w-7xl  py-4 md:px-4 md:py-4 lg:py-4 ">
      {props.showMenus && <ClassMenus />}
        {!props.loading ? (
          <div className="flex flex-wrap justify-between gap-2 md:gap-2 ">
            {props.projects.map((item: Project, idx: number) => {
              return (
                <div key={idx} className="w-full md:w-1/2  lg:w-1/5">
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