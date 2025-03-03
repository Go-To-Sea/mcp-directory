"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Section } from "@/types/landing";

export default function ({ section }: { section: Section }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <div className="text-center">
        <h2 className="mt-4 text-4xl font-semibold">{section.title}</h2>
        <p className="mt-6 font-medium text-muted-foreground">
          {section.description}
        </p>
      </div>
      <div className="mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
        {section?.items?.map((item, index) => (
          <div className="flex gap-4" key={index}>
            <span className="flex size-6 shrink-0 items-center justify-center rounded border  border-primary font-mono text-xs text-primary">
              {index + 1}
            </span>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-md text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}