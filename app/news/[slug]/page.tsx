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
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticleData() {
      // Fetch current article
      const { data: currentArticle } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      
      if (currentArticle) {
        setArticle(currentArticle);
        
        // Fetch 3 related articles
        const { data: related } = await supabase
          .from("articles")
          .select("id, title, subtitle, slug, cover_image, created_at")
          .eq("is_published", true)
          .neq("id", currentArticle.id)
          .limit(3);
        
        if (related) setRelatedArticles(related);
      }
      setIsLoading(false);
    }
    if (slug) fetchArticleData();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard! You can now share it.");
  };

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
      <main className="min-h-screen bg-[#fcfbf7] pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/news" className="inline-flex items-center gap-2 text-hbf-muted hover:text-hbf-green transition-colors mb-10 font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={14} /> Back to news
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hbf-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl md:text-2xl text-hbf-muted mb-10 leading-relaxed font-medium">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-black/5 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-hbf-green/10 flex items-center justify-center text-hbf-green">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-hbf-muted font-bold uppercase tracking-wider">Published on</p>
                  <p className="text-hbf-dark font-bold text-sm">{new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 bg-white border border-black/5 px-6 py-3 rounded-none text-hbf-dark font-bold hover:bg-hbf-dark hover:text-white transition-all text-sm uppercase tracking-widest"
              >
                <Share2 size={16} /> Copy Link
              </button>
            </div>
          </motion.div>

          {article.cover_image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-none overflow-hidden mb-20 border border-black/5"
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

          {/* Read Next Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-32 pt-20 border-t border-black/10">
              <h3 className="text-3xl font-bold text-hbf-dark mb-12">Continue Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((rel) => (
                  <Link 
                    key={rel.id} 
                    href={`/news/${rel.slug}`}
                    className="group bg-white border border-black/5 flex flex-col h-full overflow-hidden transition-all hover:bg-hbf-cream/30"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {rel.cover_image ? (
                        <img src={rel.cover_image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={rel.title} />
                      ) : (
                        <div className="w-full h-full bg-hbf-cream flex items-center justify-center text-hbf-muted">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-hbf-dark mb-2 line-clamp-2 leading-tight text-base group-hover:text-hbf-green transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-hbf-muted line-clamp-2">
                        {rel.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
