"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts;

  return (
    <>
      {/* Banner */}
      <motion.div
        className="relative w-full h-48 md:h-64 overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/image.png"
          alt="Blog Banner"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </motion.div>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {loading ? (
            <p className="text-muted-foreground font-serif italic text-center text-lg mt-12">
              Loading...
            </p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-muted-foreground font-serif italic text-center text-lg mt-12">
              No chapters found.
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="all"
                className="space-y-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <div className="flex items-baseline justify-between mb-16 px-2">
                  <h2 className="text-3xl md:text-4xl font-serif italic tracking-tight text-foreground/80">
                    Writing
                  </h2>
                  <span className="font-serif italic text-muted-foreground">
                    ({filteredPosts.length})
                  </span>
                </div>

                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    variants={item}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-baseline gap-4 w-full hover:opacity-70 transition-opacity"
                    >
                      <span className="shrink-0 font-serif italic text-muted-foreground w-6 text-right">
                        {index + 1}.
                      </span>

                      <span className="shrink-0 font-medium text-lg leading-none tracking-tight">
                        {post.title}
                      </span>

                      {/* Dotted Leader */}
                      <span className="grow border-b border-dashed border-muted-foreground/20 mx-2" />

                      <span className="shrink-0 text-sm text-muted-foreground font-serif italic">
                        {post.date}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.section>
      </main>
    </>
  );
}
