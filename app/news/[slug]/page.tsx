"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  cover_image: string;
  created_at: string;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      
      if (data) setArticle(data);
      setIsLoading(false);
    }
    if (slug) fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfbf7] pt-48 flex justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-hbf-green border-t-transparent" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#fcfbf7] pt-48 text-center">
        <h1 className="text-3xl font-bold text-hbf-dark mb-4">Article not found</h1>
        <Link href="/news" className="text-hbf-green font-bold">Back to news</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcfbf7] pt-40 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/news" className="inline-flex items-center gap-2 text-hbf-muted hover:text-hbf-green transition-colors mb-10 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to news
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-hbf-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl md:text-2xl text-hbf-muted mb-10 leading-relaxed font-medium">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-black/5 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-hbf-green/10 flex items-center justify-center text-hbf-green">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-hbf-muted font-bold uppercase tracking-wider">Published on</p>
                  <p className="text-hbf-dark font-bold text-sm">{new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
              
              <button className="flex items-center gap-2 bg-white border border-black/5 px-6 py-3 rounded-2xl text-hbf-dark font-bold hover:bg-hbf-green hover:text-white transition-all shadow-soft">
                <Share2 size={18} /> Share
              </button>
            </div>
          </motion.div>

          {article.cover_image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-2xl"
            >
              <img 
                src={article.cover_image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-xl max-w-none prose-h2:text-4xl prose-h2:font-bold prose-h2:text-hbf-dark prose-h2:mt-16 prose-h3:text-3xl prose-h3:font-bold prose-p:text-hbf-muted prose-p:leading-relaxed prose-strong:text-hbf-dark prose-strong:font-bold prose-a:text-hbf-green prose-a:font-bold prose-img:rounded-[2rem] prose-img:shadow-xl"
          >
            <ReactMarkdown>
              {article.content}
            </ReactMarkdown>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}
