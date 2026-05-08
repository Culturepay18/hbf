"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
      <main className="min-h-screen bg-[#fcfbf7] pt-32 pb-24">
        <div className="container mx-auto px-6">
          <header className="max-w-3xl mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-hbf-dark mb-4"
            >
              Latest <span className="text-hbf-green">Stories</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-hbf-muted leading-relaxed font-medium"
            >
              Discover our latest updates and success stories.
            </motion.p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-black/5 rounded-none animate-pulse" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-black/5 rounded-none">
              <h3 className="text-2xl font-bold text-hbf-dark mb-4">No published articles yet</h3>
              <p className="text-hbf-muted">Check back soon for more news!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col h-full"
                >
                  <div className="bg-white border border-black/5 flex flex-col h-full overflow-hidden transition-all hover:bg-hbf-cream/30">
                    <Link href={`/news/${article.slug}`} className="block relative aspect-video overflow-hidden">
                      {article.cover_image ? (
                        <img 
                          src={article.cover_image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-hbf-cream flex items-center justify-center text-hbf-muted">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-hbf-green mb-3">
                        <Calendar size={12} />
                        {new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                      </div>

                      <Link href={`/news/${article.slug}`}>
                        <h2 className="text-lg font-bold text-hbf-dark mb-3 group-hover:text-hbf-green transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h2>
                      </Link>

                      <div className="text-xs text-hbf-muted mb-6 line-clamp-2 font-medium flex-grow leading-relaxed whitespace-pre-wrap">
                        <ReactMarkdown>{article.subtitle}</ReactMarkdown>
                      </div>

                      <Link 
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-hbf-dark font-bold group/link hover:text-hbf-green transition-colors text-[11px] uppercase tracking-wider"
                      >
                        Read article 
                        <div className="w-6 h-6 rounded-full bg-hbf-dark text-white flex items-center justify-center transition-all group-hover/link:bg-hbf-green group-hover/link:translate-x-1">
                          <ArrowRight size={12} />
                        </div>
                      </Link>
                    </div>
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
