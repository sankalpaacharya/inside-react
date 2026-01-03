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

const TOPICS = ["Artificial Intelligence", "Engineering", "Design", "Thoughts"];

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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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

  const filteredPosts = selectedTopic
    ? posts.filter((post) => post.topic === selectedTopic)
    : posts;

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
        {/* Topics Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xl font-semibold mb-6">Topics</h2>
          <div className="flex flex-wrap gap-6">
            {TOPICS.map((topic, index) => (
              <motion.button
                key={topic}
                onClick={() =>
                  setSelectedTopic(selectedTopic === topic ? null : topic)
                }
                className={`text-sm transition-colors flex items-center gap-1.5 ${
                  selectedTopic === topic
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-muted-foreground">↳</span>
                {topic}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* All Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xl font-semibold mb-8">All posts</h2>

          {loading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-muted-foreground">No posts found.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTopic || "all"}
                className="space-y-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    variants={item}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex justify-between items-start gap-8 py-6 border-b border-border last:border-b-0"
                    >
                      <motion.div
                        className="flex-1 min-w-0"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {post.description}
                        </p>
                      </motion.div>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {post.date}
                      </p>
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
