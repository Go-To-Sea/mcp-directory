/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-04 00:39:41
 */
import BgStar from "../../assets/imgs/bgstar.svg";
import Buttons from "./buttons";
import { Hero } from "@/types/landing";

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  return (
    <section className="relatve ">
      <div className="mx-auto w-full max-w-7xl px-4 mt-10 md:mt-14">
        <div className="mx-auto w-full max-w-4xl text-center ">
        <a href="/servers" className="dark:bg-[#000] mx-auto mb-3 inline-flex items-center gap-3 rounded-full border border-primary  px-2 py-1 text-sm">
          <span className="inline-flex items-center  text-white rounded-full border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  bg-primary text-primary-foreground">
            {count}
          </span>
          <span className="dark:text-[#fff]">mcp servers stored</span>
        </a>
          <div className="flex items-center justify-center mt-3">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-4xl font-bold md:text-5xl mr-5">
              {hero.title}
            </h1>
            <h1 className="text-primary  leading-tight text-4xl font-bold md:text-5xl ">
              {hero.title2}
            </h1>
          </div>
          <h2 className="mt-5 mx-auto max-w-3xl text-muted-foreground lg:text-xl ">
            {/* <span className="text-primary font-bold">{count}</span>{" "} */}
            {hero.description}
          </h2>
        </div>
      </div>
      {/* <img
        src={BgStar.src}
        alt=""
        className="absolute bottom-[auto] left-[auto] right-0 top-24 -z-10 inline-block max-[767px]:hidden"
      />
      <img
        src={BgStar.src}
        alt="bgstar"
        className="absolute bottom-[auto] right-[auto] left-0 top-60 -z-10 inline-block max-[767px]:hidden"
      /> */}
      <Buttons />
    </section>
  );
};
