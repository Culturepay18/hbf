"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Trophy, Save, X, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { MediaGallery } from "@/components/admin/MediaGallery";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  budget: string;
  impact: string;
  status: string;
  category: string;
  cover_image: string;
  is_active: boolean;
}

export default function AdminFinalists() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchFinalists();
  }, []);

  async function fetchFinalists() {
    setIsLoading(true);
    const { data } = await supabase
      .from("competition_finalists")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setFormData({
      title: "",
      problem: "",
      solution: "",
      budget: "",
      impact: "",
      category: "NS3",
      cover_image: "",
      is_active: true,
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      title: formData.title,
      problem: formData.problem,
      solution: formData.solution,
      budget: formData.budget,
      impact: formData.impact,
      category: formData.category || "NS3",
      is_active: formData.is_active ?? true,
    };

    if (!editingId) {
      const { error } = await supabase.from("competition_finalists").insert([payload]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from("competition_finalists").update(payload).eq("id", editingId);
      if (error) alert("Error: " + error.message);
    }

    await fetchFinalists();
    closeModal();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this finalist team?")) {
      const { error } = await supabase.from("competition_finalists").delete().eq("id", id);
      if (error) alert("Error: " + error.message);
      else fetchFinalists();
    }
  };

  const inp = "w-full rounded-xl border border-black/10 bg-[#f8f6f0] px-4 py-2.5 text-sm text-hbf-dark outline-none transition focus:border-hbf-green focus:bg-white";
  const lbl = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-hbf-muted";

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Competition Finalists</h1>
          <p className="mt-1 text-hbf-muted">Manage teams competing for the HBF Scholarship.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-hbf-orange px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-hbf-orange-light transform hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Add Finalist Team
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-hbf-green" size={48} />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-black/10 bg-white py-24 text-center">
          <Trophy size={48} className="text-black/10 mb-4" />
          <h3 className="text-xl font-bold text-hbf-dark">No finalists yet</h3>
          <p className="mt-2 text-hbf-muted max-w-xs">Once you add teams here, they will appear on the Scholarship page.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] border border-black/5 p-8 shadow-soft group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-hbf-dark">Team: {item.title}</h3>
                  <p className="text-xs font-bold text-hbf-orange uppercase mt-1 tracking-widest">{item.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(item)} className="p-2 rounded-xl bg-[#f8f6f0] text-hbf-dark hover:bg-hbf-dark hover:text-white transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-hbf-muted mb-1">Problem</p>
                  <p className="text-sm line-clamp-2">{item.problem}</p>
                </div>
                <div className="pt-4 border-t border-black/5 flex justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-hbf-muted">Budget</p>
                    <p className="font-bold text-hbf-dark">{item.budget}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-hbf-muted">Impact</p>
                    <p className="font-bold text-hbf-green">{item.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeModal} />
          <div className="relative z-10 mx-4 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/5 px-8 py-5 text-white bg-hbf-dark">
              <h3 className="text-xl font-bold">Manage Finalist Team</h3>
              <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={lbl}>Team Name</label>
                <input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inp} placeholder="Ex: Green Haiti" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Student Level</label>
                  <input type="text" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inp} placeholder="NS3" />
                </div>
                <div>
                  <label className={lbl}>Visibility</label>
                  <select value={formData.is_active ? "true" : "false"} onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "true" })} className={inp}>
                    <option value="true">Visible on Site</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={lbl}>Problem Statement</label>
                <textarea rows={3} value={formData.problem || ""} onChange={(e) => setFormData({ ...formData, problem: e.target.value })} className={`${inp} resize-none`} placeholder="Describe the issue..." />
              </div>

              <div>
                <label className={lbl}>Proposed Solution</label>
                <textarea rows={3} value={formData.solution || ""} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} className={`${inp} resize-none`} placeholder="Describe the solution..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Budget Required</label>
                  <input type="text" value={formData.budget || ""} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inp} placeholder="$2,500" />
                </div>
                <div>
                  <label className={lbl}>Impact Details</label>
                  <input type="text" value={formData.impact || ""} onChange={(e) => setFormData({ ...formData, impact: e.target.value })} className={inp} placeholder="10 tons of plastic removed" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-black/5 bg-[#f8f6f0]/30 px-8 py-5">
              <button onClick={closeModal} className="px-5 py-2 text-sm font-bold text-hbf-muted">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-hbf-orange px-8 py-3 text-sm font-bold text-white shadow-lg disabled:opacity-50">
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {isSaving ? "Saving..." : "Save Finalist Team"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
