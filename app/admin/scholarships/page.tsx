"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, Trophy, Link as LinkIcon, Save, X, Loader2, Users, UserCheck, Globe, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  status: string;
  location: string;
  deadline: string;
  prize: string;
  details_link: string;
}

interface Stat {
  id: string;
  label: string;
  value: number;
  icon_name: string;
}

export default function AdminScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Scholarship>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    const { data: sData } = await supabase
      .from("scholarships")
      .select("*")
      .order("created_at", { ascending: false });
    if (sData) setScholarships(sData);
    
    setIsLoading(false);
  }

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      status: "Open",
      location: "",
      deadline: "",
      prize: "",
      details_link: "",
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Scholarship) => {
    setFormData(item);
    setEditingId(item.id);
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
      description: formData.description,
      status: formData.status,
      location: formData.location,
      deadline: formData.deadline,
      prize: formData.prize,
      details_link: formData.details_link,
    };

    if (!editingId) {
      const { error } = await supabase.from("scholarships").insert([payload]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from("scholarships").update(payload).eq("id", editingId);
      if (error) alert("Error: " + error.message);
    }

    await fetchData();
    closeModal();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this scholarship?")) {
      const { error } = await supabase.from("scholarships").delete().eq("id", id);
      if (error) alert("Error: " + error.message);
      else fetchData();
    }
  };

  const inp = "w-full rounded-xl border border-black/10 bg-[#f8f6f0] px-4 py-2.5 text-sm text-hbf-dark outline-none transition focus:border-hbf-green focus:bg-white";
  const lbl = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-hbf-muted";

  return (
    <div className="admin-scholarships-page pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Scholarships</h1>
          <p className="mt-1 text-hbf-muted">Manage programs, finalist teams, and competition statistics.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-hbf-green px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-hbf-green-light transform hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> New Scholarship
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-hbf-green" size={48} />
        </div>
      ) : (
        <div className="space-y-12">
          {/* Scholarships Table */}
          <section>
            <h2 className="text-xl font-bold text-hbf-dark mb-6">Scholarship Programs</h2>
            {scholarships.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-black/10 bg-white py-24 text-center">
                <h3 className="text-xl font-bold text-hbf-dark">No scholarships found</h3>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-black/5 bg-white shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-hbf-muted">
                    <thead className="bg-[#f8f6f0] text-xs uppercase tracking-widest text-hbf-dark">
                      <tr>
                        <th className="px-8 py-5 font-bold">Program</th>
                        <th className="px-8 py-5 font-bold">Status</th>
                        <th className="px-8 py-5 font-bold">Prize & Deadline</th>
                        <th className="px-8 py-5 font-bold">Link</th>
                        <th className="px-8 py-5 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {scholarships.map((item) => (
                        <tr key={item.id} className="transition-colors hover:bg-black/[0.01]">
                          <td className="px-8 py-5">
                            <div className="max-w-xs">
                              <p className="font-bold text-hbf-dark text-base">{item.title}</p>
                              <p className="text-xs line-clamp-1 flex items-center gap-1 mt-1">
                                <MapPin size={12} /> {item.location}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <Badge variant={item.status === "Open" ? "success" : item.status === "Coming soon" ? "warning" : "neutral"}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-8 py-5">
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-hbf-dark flex items-center gap-1.5">
                                <Trophy size={14} className="text-hbf-orange" /> {item.prize}
                              </p>
                              <p className="text-[11px] flex items-center gap-1.5">
                                <Calendar size={14} /> {new Date(item.deadline).toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            {item.details_link ? (
                              <a href={item.details_link} target="_blank" className="text-hbf-green hover:underline flex items-center gap-1 font-bold text-xs">
                                <LinkIcon size={14} /> View Link
                              </a>
                            ) : <span className="text-black/20 italic">No link</span>}
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openEditModal(item)} className="p-2 rounded-lg bg-hbf-cream text-hbf-dark hover:bg-hbf-dark hover:text-white transition-all">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeModal} />
          <div className="relative z-10 mx-4 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/5 px-8 py-5">
              <h3 className="text-xl font-bold text-hbf-dark">{editingId ? "Edit Scholarship" : "New Scholarship"}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-black/5 rounded-full text-hbf-muted"><X size={24} /></button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={lbl}>Scholarship Title</label>
                <input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inp} placeholder="Ex: Essay Competition 2026" />
              </div>
              <div>
                <label className={lbl}>Description</label>
                <textarea rows={3} value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inp} resize-none`} placeholder="Short summary..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Status</label>
                  <select value={formData.status || "Open"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inp}>
                    <option value="Open">Open</option>
                    <option value="Coming soon">Coming soon</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className={lbl}>Location</label>
                  <input type="text" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Prize</label>
                  <input type="text" value={formData.prize || ""} onChange={(e) => setFormData({ ...formData, prize: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Deadline</label>
                  <input type="date" value={formData.deadline || ""} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className={inp} />
                </div>
              </div>
              <div>
                <label className={lbl}>Details Link</label>
                <input type="text" value={formData.details_link || ""} onChange={(e) => setFormData({ ...formData, details_link: e.target.value })} className={inp} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-black/5 bg-[#f8f6f0]/30 px-8 py-5">
              <button onClick={closeModal} className="px-5 py-2 text-sm font-bold text-hbf-muted">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-hbf-green px-8 py-3 text-sm font-bold text-white shadow-lg disabled:opacity-50">
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {isSaving ? "Saving..." : "Save Scholarship"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
