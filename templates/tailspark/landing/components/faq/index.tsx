"use client"

import { motion } from "framer-motion"
import type { Section } from "@/types/landing"

export default function ({ section }: { section?: Section }) {
  return (
    <div className="container mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12 lg:py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {section?.title}
        </h2>
        <p className="mt-1 font-medium text-muted-foreground max-w-xl mx-auto">{section?.description}</p>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {section?.items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="p-5 rounded-xl bg-primary/5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  {index + 1}
                </div>
                <h3 className="font-medium text-lg text-primary">
                  {item.title}
                </h3>
              </div>

              <div className="pl-12 pt-4 text-muted-foreground">
                {item.description}
              </div>
            </div>

            {index < section.items!.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mx-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

