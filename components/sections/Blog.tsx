"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  cover_image: string;
}

export function Blog() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (data) setPosts(data);
      setIsLoading(false);
    }
    fetchLatestPosts();
  }, []);

  return (
    <section id="blog" className="bg-[#fcfbf7] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-hbf-green mb-4">Latest Updates</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-hbf-dark">
              Our Latest <span className="text-hbf-green">Stories</span>
            </h2>
          </div>
          <Link 
            href="/news" 
            className="group inline-flex items-center gap-2 text-sm font-bold text-hbf-dark hover:text-hbf-green transition-colors"
          >
            VIEW ALL ARTICLES <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-black/5 rounded-none animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-none">
            <p className="text-hbf-muted font-medium italic text-lg">New stories coming soon...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white border border-black/5 overflow-hidden transition-all hover:bg-hbf-cream/30"
              >
                <Link href={`/news/${post.slug}`} className="block relative aspect-video overflow-hidden">
                  {post.cover_image ? (
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-hbf-cream flex items-center justify-center text-hbf-muted">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-hbf-green mb-3">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(post.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </div>

                  <h3 className="text-lg font-bold leading-tight text-hbf-dark mb-3 group-hover:text-hbf-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-hbf-muted line-clamp-2 font-medium mb-6 flex-grow leading-relaxed">
                    {post.subtitle}
                  </p>
                  
                  <Link
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center gap-2 text-hbf-dark font-bold group/link hover:text-hbf-green transition-colors text-[11px] uppercase tracking-wider"
                  >
                    Read article
                    <div className="w-6 h-6 rounded-full bg-hbf-dark text-white flex items-center justify-center transition-all group-hover/link:bg-hbf-green group-hover/link:translate-x-1">
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
