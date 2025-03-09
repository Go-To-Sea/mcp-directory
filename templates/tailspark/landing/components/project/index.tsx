import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { Category } from "@/types/category";
import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import Preview from "./preview";
import { Project } from "@/types/project";
import Projects from "../projects";
import Stars from "../stars";
import moment from "moment";

export default ({
  category,
  project,
  more_projects,
}: {
  category?: Category;
  project: Project;
  more_projects?: Project[];
}) => {
  const tagsArr = project.tags 
    ? (typeof project.tags === 'string' ? project.tags.split(",") : project.tags)
    : [];

  return (
    <div className="mx-auto min-height-[200px] max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <Crumb category={category} project={project} />

      <div className="mx-auto w-full max-w-7xl py-8 md:py-8 lg:py-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2 mt-8">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-4xl font-bold md:text-6xl">{project.title}</h1>

            <div className="flex items-center gap-2 mt-4">
              <p className="text-md sm:text-md">
                Created at{" "}
                <span className="text-primary">
                  {moment(project.updated_at).fromNow()}
                </span>
              </p>
              <p className="text-md sm:text-md">
                by <span className="text-primary">{project.author_name}</span>
              </p>
            </div>
            <div className="mt-4">
              <Stars />
            </div>
            <p className="text-sm text-[#808080] sm:text-xl mt-4">
              {project.description}
            </p>
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            <div className="mb-6 flex flex-col gap-2 text-sm text-[#808080] sm:text-base lg:mb-8">
              <p className="font-medium">
                <BiCategory className="inline-block mr-2" />
                Categories
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-primary text-xs border border-solid border-primary rounded-md px-2 py-1">
                  {project.category}
                </span>
              </div>
              <p className="font-medium mt-4">
                <BsTags className="inline-block mr-2" />
                Tags
              </p>
              {tagsArr &&
                tagsArr.map((tag) => (
                  <p key={tag}>
                    <input
                      type="checkbox"
                      className="mr-2"
                      readOnly
                      checked={tagsArr && tagsArr.includes(tag)}
                    />
                    {tag}
                  </p>
                ))}
            </div>

            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <a
                href={project.url}
                target="_blank"
                className="flex items-center gap-2 rounded-md border border-solid bg-primary text-white px-6 py-3 truncate"
              >
                <span>Visit {project.title} 👉</span>
              </a>
            </div>
          </div>
          {(project.img_url || project.avatar_url) && (
            <div className="min-h-96 rounded-md overflow-hidden">
              <Preview project={project} />
            </div>
          )}
        </div>
      </div>

      {project.summary && (
        <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg bg-white dark:bg-gray-900">
          <Markdown content={project.summary || ""} />
        </div>
      )}

      <div className="w-full text-center bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mt-16">
        <p className="mx-auto font-bold text-3xl mb-4">View More</p>
        {more_projects && <Projects projects={more_projects} />}
      </div>
    </div>
  );
};
