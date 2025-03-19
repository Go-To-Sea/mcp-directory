"use client"

import { motion } from "framer-motion"
import type { Section } from "@/types/landing"

export default function ({ section }: { section?: Section }) {
  return (
    <div className="container mx-auto max-w-8xl px-4 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {section?.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-medium text-muted-foreground max-w-xl mx-auto px-4">
          {section?.description}
        </p>
      </div>

      <div className="mx-auto max-w-5xl space-y-4 sm:space-y-6">
        {section?.items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-start p-4 sm:py-5 rounded-xl bg-primary/5 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex size-6 sm:size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm sm:text-base">
                  {index + 1}
                </div>
                <h3 className="font-medium text-base sm:text-lg text-primary">
                  {item.title}
                </h3>
              </div>

              <div className="text-sm sm:text-base text-muted-foreground md:text-left pl-9 md:pl-0">
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

