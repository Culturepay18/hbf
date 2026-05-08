"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import { MediaGallery } from "@/components/admin/MediaGallery";

// Dynamic import for MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  cover_image: string;
  slug: string;
  is_published: boolean;
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setIsLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setArticles(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setFormData({
      title: "",
      subtitle: "",
      content: "",
      cover_image: "",
      slug: "",
      is_published: true,
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setFormData(article);
    setEditingId(article.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    let slug = formData.slug;
    if (!slug && formData.title) {
      slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    
    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      content: formData.content,
      cover_image: formData.cover_image,
      slug,
      is_published: formData.is_published ?? true,
      category: "General",
      author: "HBF Team",
      excerpt: formData.subtitle
    };

    if (!editingId) {
      const { error } = await supabase.from("articles").insert([payload]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
      if (error) alert("Error: " + error.message);
    }

    await fetchArticles();
    closeModal();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) alert("Error: " + error.message);
      else fetchArticles();
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    const { error } = await supabase.from("articles").update({ is_published: !current }).eq("id", id);
    if (error) alert("Error: " + error.message);
    else setArticles(articles.map((a) => (a.id === id ? { ...a, is_published: !current } : a)));
  };

  const inp = "w-full rounded-2xl border border-black/10 bg-[#f8f6f0] px-5 py-3 text-sm text-hbf-dark outline-none transition focus:border-hbf-green focus:bg-white";
  const lbl = "mb-2 block text-xs font-bold uppercase tracking-widest text-hbf-muted";

  return (
    <div className="admin-articles-page">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-hbf-dark">Articles</h1>
          <p className="mt-1 text-hbf-muted">Manage your blog posts simply.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-2xl bg-hbf-green px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-hbf-green-light transform hover:scale-105 active:scale-95"
        >
          <Plus size={20} /> New Article
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-hbf-green border-t-transparent" />
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-black/10 bg-white py-24 text-center">
          <h3 className="text-2xl font-bold text-hbf-dark">No articles yet</h3>
          <p className="mt-2 text-hbf-muted">Get started by creating your first article.</p>
        </div>
      ) : (
        <div className="rounded-[2.5rem] border border-black/5 bg-white shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f6f0] text-xs uppercase tracking-widest text-hbf-dark">
              <tr>
                <th className="px-8 py-5 font-bold">Preview</th>
                <th className="px-8 py-5 font-bold">Title & Subtitle</th>
                <th className="px-8 py-5 font-bold">Status</th>
                <th className="px-8 py-5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {articles.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-black/[0.01]">
                  <td className="px-8 py-4">
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-hbf-cream border border-black/5">
                      {item.cover_image ? (
                        <img src={item.cover_image} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-hbf-muted">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="max-w-md">
                      <p className="font-bold text-hbf-dark text-base line-clamp-1">{item.title}</p>
                      <p className="text-hbf-muted text-xs line-clamp-1">{item.subtitle || "No subtitle"}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <button onClick={() => toggleVisibility(item.id, item.is_published)} className="flex items-center gap-2 group">
                      {item.is_published ? (
                        <div className="flex items-center gap-2 px-3 py-1 bg-hbf-green/10 text-hbf-green rounded-full font-bold text-xs group-hover:bg-hbf-green/20">
                          <Eye size={14} /> Published
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1 bg-hbf-orange/10 text-hbf-orange rounded-full font-bold text-xs group-hover:bg-hbf-orange/20">
                          <EyeOff size={14} /> Draft
                        </div>
                      )}
                    </button>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEditModal(item)} className="p-2.5 rounded-xl bg-hbf-cream text-hbf-dark hover:bg-hbf-dark hover:text-white transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Overlay for Article Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeModal} />
          <div className="relative z-10 mx-4 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col rounded-[3rem] bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/5 bg-white px-10 py-6">
              <h3 className="text-2xl font-bold text-hbf-dark">
                {editingId ? "Edit Article" : "New Article"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-black/5 rounded-full transition-colors text-hbf-muted">
                <X size={28} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-10 space-y-8" data-color-mode="light">
              <div className="grid grid-cols-3 gap-10">
                {/* Left Column: Image Selection */}
                <div className="col-span-1">
                  <label className={lbl}>Cover Image</label>
                  <button 
                    onClick={() => setIsGalleryOpen(true)}
                    className="w-full aspect-[4/3] rounded-[2rem] border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-3 hover:bg-hbf-cream transition-all overflow-hidden relative group"
                  >
                    {formData.cover_image ? (
                      <>
                        <img src={formData.cover_image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-white text-hbf-dark px-4 py-2 rounded-full text-sm font-bold shadow-xl">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-hbf-cream rounded-full flex items-center justify-center text-hbf-muted">
                          <ImageIcon size={32} />
                        </div>
                        <span className="text-sm font-bold text-hbf-muted">Select an image</span>
                      </>
                    )}
                  </button>
                  {formData.cover_image && (
                    <button 
                      onClick={() => setFormData({ ...formData, cover_image: "" })}
                      className="mt-4 text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove image
                    </button>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-black/5">
                    <label className={lbl}>Visibility</label>
                    <select 
                      value={formData.is_published ? "true" : "false"} 
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.value === "true" })} 
                      className={inp}
                    >
                      <option value="true">Published (Visible)</option>
                      <option value="false">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                {/* Right Columns: Title, Subtitle & Description */}
                <div className="col-span-2 space-y-6">
                  <div>
                    <label className={lbl}>Title</label>
                    <input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inp} placeholder="Catchy title..." />
                  </div>

                  <div>
                    <label className={lbl}>Subtitle</label>
                    <input type="text" value={formData.subtitle || ""} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className={inp} placeholder="A short introduction..." />
                  </div>

                  <div>
                    <label className={lbl}>Description (Content)</label>
                    <div className="border border-black/10 rounded-[1.5rem] overflow-hidden">
                      <MDEditor
                        value={formData.content || ""}
                        onChange={(val) => setFormData({ ...formData, content: val })}
                        preview="edit"
                        height={350}
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-hbf-muted font-medium">You can use Markdown for formatting (Bold, Italic, Links).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 border-t border-black/5 bg-[#f8f6f0]/30 px-10 py-6">
              <button onClick={closeModal} className="px-6 py-2 text-sm font-bold text-hbf-muted hover:text-hbf-dark transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-2xl bg-hbf-green px-10 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-hbf-green-light disabled:opacity-50 transform hover:scale-105 active:scale-95"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Gallery Modal */}
      {isGalleryOpen && (
        <MediaGallery 
          onSelect={(url) => {
            setFormData({ ...formData, cover_image: url });
            setIsGalleryOpen(false);
          }}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
}
