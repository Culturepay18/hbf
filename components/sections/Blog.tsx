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
    <section id="blog" className="bg-[#fcfbf7] py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-hbf-green mb-4">News & Impact</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-hbf-dark">
              Stories of culture, sports, and opportunity.
            </h2>
          </div>
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hbf-dark text-white font-bold hover:bg-hbf-green transition-all shadow-xl hover:translate-x-1"
          >
            Tous les articles <ArrowRight size={20} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-10 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[28rem] bg-black/5 rounded-[3rem] animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-[3rem]">
            <p className="text-hbf-muted font-medium italic text-lg">Bientôt de nouveaux articles...</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-black/5 shadow-soft hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <Link href={`/news/${post.slug}`} className="block relative aspect-video overflow-hidden">
                  {post.cover_image ? (
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-hbf-cream flex items-center justify-center text-hbf-muted">
                      <ImageIcon size={32} />
                    </div>
                  )}
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold leading-tight text-hbf-dark group-hover:text-hbf-green transition-colors line-clamp-2 mb-4">
                    {post.title}
                  </h3>
                  <p className="text-hbf-muted line-clamp-2 text-base font-medium mb-8">
                    {post.subtitle}
                  </p>
                  
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-hbf-dark hover:text-hbf-green transition-colors"
                  >
                    Lire la suite
                    <div className="w-8 h-8 rounded-full bg-hbf-cream flex items-center justify-center group-hover:bg-hbf-green group-hover:text-white transition-all">
                      <ArrowUpRight size={16} />
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
