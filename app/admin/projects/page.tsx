"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { MediaGallery } from "@/components/admin/MediaGallery";

interface Project {
  id: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  budget: string;
  impact: string;
  impact_label: string;
  status: string;
  category: string;
  cover_image: string;
  is_active: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isSaving, setIsLoadingSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    const { data } = await supabase
      .from("innovation_projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setFormData({
      title: "",
      slug: "",
      problem: "",
      solution: "",
      budget: "",
      impact: "",
      impact_label: "Projected Impact",
      status: "Active Project",
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
    setIsLoadingSaving(true);
    let slug = formData.slug;
    if (!slug && formData.title) {
      slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    const payload = {
      title: formData.title,
      slug,
      problem: formData.problem,
      solution: formData.solution,
      budget: formData.budget,
      impact: formData.impact,
      impact_label: formData.impact_label || "Projected Impact",
      status: formData.status,
      category: formData.category,
      cover_image: formData.cover_image,
      is_active: formData.is_active ?? true,
    };

    if (!editingId) {
      const { error } = await supabase.from("innovation_projects").insert([payload]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from("innovation_projects").update(payload).eq("id", editingId);
      if (error) alert("Error: " + error.message);
    }

    await fetchProjects();
    closeModal();
    setIsLoadingSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from("innovation_projects").delete().eq("id", id);
      if (error) alert("Error: " + error.message);
      else fetchProjects();
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    const { error } = await supabase.from("innovation_projects").update({ is_active: !current }).eq("id", id);
    if (error) alert("Error: " + error.message);
    else setProjects(projects.map((p) => (p.id === id ? { ...p, is_active: !current } : p)));
  };

  const inp = "w-full rounded-lg border border-black/10 bg-[#f8f6f0] px-3 py-2 text-sm text-hbf-dark outline-none transition focus:border-hbf-green focus:bg-white";
  const lbl = "mb-1 block text-xs font-bold uppercase tracking-wider text-hbf-muted";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Innovation Lab</h1>
          <p className="mt-1 text-hbf-muted">Manage active and past projects.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-hbf-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hbf-green-light"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-hbf-green border-t-transparent" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-white py-24 text-center">
          <h3 className="text-lg font-bold text-hbf-dark">No projects yet</h3>
          <p className="mt-2 max-w-sm text-hbf-muted">Add your first Innovation Lab project.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-black/5 bg-white shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f6f0] text-xs uppercase text-hbf-dark">
              <tr>
                <th className="px-6 py-4 font-bold">Project Title</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Visibility</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {projects.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-black/[0.02]">
                  <td className="px-6 py-4 font-semibold text-hbf-dark">{item.title}</td>
                  <td className="px-6 py-4 text-hbf-muted">{item.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={item.status === "Active Project" ? "success" : "warning"} className="border-none">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleVisibility(item.id, item.is_active)} className="flex items-center gap-1.5 rounded-lg p-1 transition hover:bg-black/5">
                      {item.is_active ? (
                        <><Eye size={15} className="text-hbf-green" /><span className="font-semibold text-hbf-green text-xs">Visible</span></>
                      ) : (
                        <><EyeOff size={15} className="text-hbf-orange" /><span className="font-semibold text-hbf-orange text-xs">Competition Finished</span></>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(item)} className="rounded-lg p-2 text-hbf-muted transition hover:bg-black/5 hover:text-hbf-dark">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={closeModal}
          />

          {/* Modal Panel */}
          <div className="relative z-10 mx-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
              <h3 className="text-lg font-bold text-hbf-dark">
                {editingId ? "Edit Project" : "Add Project"}
              </h3>
              <button
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-hbf-muted transition hover:bg-black/10 hover:text-hbf-dark"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Row 1: Title + Category + Status + Visibility (4 cols) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className={lbl}>Project Title</label>
                  <input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inp} placeholder="Ex: Green Haiti" />
                </div>
                <div>
                  <label className={lbl}>Category / Level</label>
                  <input type="text" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inp} placeholder="NS3" />
                </div>
                <div>
                  <label className={lbl}>Status</label>
                  <select value={formData.status || "Active Project"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inp}>
                    <option value="Active Project">Active Project</option>
                    <option value="Future Student Project">Future Student Project</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Problem + Solution side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Problem</label>
                  <textarea rows={4} value={formData.problem || ""} onChange={(e) => setFormData({ ...formData, problem: e.target.value })} className={`${inp} resize-none`} placeholder="Describe the problem this project addresses..." />
                </div>
                <div>
                  <label className={lbl}>Solution</label>
                  <textarea rows={4} value={formData.solution || ""} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} className={`${inp} resize-none`} placeholder="Describe the proposed solution..." />
                </div>
              </div>

              {/* Row 3: Budget + Impact Label + Visibility (3 cols) */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={lbl}>Budget</label>
                  <input type="text" value={formData.budget || ""} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inp} placeholder="$2,500 or $4k–$6k" />
                </div>
                <div>
                  <label className={lbl}>Impact Label</label>
                  <input type="text" value={formData.impact_label || ""} onChange={(e) => setFormData({ ...formData, impact_label: e.target.value })} className={inp} placeholder="Projected Impact..." />
                </div>
                <div>
                  <label className={lbl}>Visibility</label>
                  <select value={formData.is_active ? "true" : "false"} onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "true" })} className={inp}>
                    <option value="true">Visible (Published)</option>
                    <option value="false">Competition Finished</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Impact Details + Slug + Cover (2-1 grid) */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  <div>
                    <label className={lbl}>Impact Details</label>
                    <textarea rows={3} value={formData.impact || ""} onChange={(e) => setFormData({ ...formData, impact: e.target.value })} className={`${inp} resize-none`} placeholder="Describe the expected impact of the project..." />
                  </div>
                  <div>
                    <label className={lbl}>Slug URL <span className="normal-case font-normal text-hbf-muted">(auto if empty)</span></label>
                    <input type="text" value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className={inp} placeholder="green-haiti" />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Cover Image</label>
                  <button 
                    onClick={() => setIsGalleryOpen(true)}
                    className="w-full aspect-video rounded-[1.5rem] border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 hover:bg-black/5 transition-all overflow-hidden relative"
                  >
                    {formData.cover_image ? (
                      <>
                        <img src={formData.cover_image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="bg-white text-hbf-dark px-3 py-1 rounded-full text-xs font-bold">Change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="text-hbf-muted" size={24} />
                        <span className="text-xs font-bold text-hbf-muted">Select</span>
                      </>
                    )}
                  </button>
                  {formData.cover_image && (
                    <button 
                      onClick={() => setFormData({ ...formData, cover_image: "" })}
                      className="mt-2 text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-black/5 bg-white px-6 py-4">
              <button onClick={closeModal} className="rounded-xl px-5 py-2 text-sm font-medium text-hbf-muted transition hover:bg-black/5">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-xl bg-hbf-green px-6 py-2 text-sm font-bold text-white transition hover:bg-hbf-green-light disabled:opacity-50"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Project"}
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
