"use client";

import { useEffect, useState } from "react";

import { CiStar } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import StarIcon from "../../assets/imgs/star.svg";

export default function ({
  owner,
  repo,
  interval = 6000,
}: {
  owner: string;
  repo: string;
  interval: number;
}) {
  const [stars, setStars] = useState(0);

  const fetchStars = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const data = await response.json();
      setStars(data.stargazers_count);
    } catch (error) {
      console.error("Error fetching star count:", error);
    }
  };

  useEffect(() => {
    fetchStars();
    const intervalId = setInterval(fetchStars, interval);
    return () => clearInterval(intervalId);
  }, [owner, repo, interval]);

  return (
    <a
      href="https://github.com/chatmcp/mcp-directory?utm_source=mcp.ad"
      target="_blank"
      className="hidden md:flex w-64 mx-auto items-center border border-primary rounded-lg px-6 py-1.5 ml-4 cursor-pointer"
    >
      <FaGithub className="text-gray-900 w-8 h-8" />
      <div className="flex flex-col items-start ml-2">
        <div className="text-sm text-gray-900 font-bold">
          Open-Source(
          <img
            src={StarIcon.src}
            alt="star"
            className="inline-block w-4 flex-none -mt-1"
          />
          {stars})
        </div>
        <div className="text-xs text-gray-900 font-medium">
          chatmcp/mcp-directory
        </div>
      </div>
    </a>
  );
}
