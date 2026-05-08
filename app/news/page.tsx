"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  cover_image: string;
  created_at: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      
      if (data) setArticles(data);
      setIsLoading(false);
    }
    fetchArticles();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcfbf7] pt-40 pb-24">
        <div className="container mx-auto px-6">
          <header className="max-w-3xl mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-hbf-dark mb-6"
            >
              Latest <span className="text-hbf-green">Stories</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-hbf-muted leading-relaxed font-medium"
            >
              Discover our latest updates, success stories, and ongoing projects in Haiti.
            </motion.p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[28rem] bg-black/5 rounded-[3rem] animate-pulse" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32 border-2 border-dashed border-black/5 rounded-[3rem]">
              <h3 className="text-3xl font-bold text-hbf-dark mb-4">No published articles yet</h3>
              <p className="text-hbf-muted">Check back soon for more news!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col h-full"
                >
                  <Link href={`/news/${article.slug}`} className="block relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-soft group-hover:shadow-2xl transition-all duration-500 mb-8">
                    {article.cover_image ? (
                      <img 
                        src={article.cover_image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-hbf-cream flex items-center justify-center text-hbf-muted">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  <div className="flex flex-col flex-grow px-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-hbf-green mb-4">
                      <Calendar size={14} />
                      {new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </div>

                    <Link href={`/news/${article.slug}`}>
                      <h2 className="text-2xl md:text-3xl font-bold text-hbf-dark mb-4 group-hover:text-hbf-green transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-hbf-muted mb-8 line-clamp-2 text-base font-medium flex-grow">
                      {article.subtitle}
                    </p>

                    <Link 
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-hbf-dark font-bold group/link hover:text-hbf-green transition-colors"
                    >
                      Read article 
                      <div className="w-8 h-8 rounded-full bg-hbf-dark text-white flex items-center justify-center transition-all group-hover/link:bg-hbf-green group-hover/link:translate-x-1">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
