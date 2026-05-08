"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Search, 
  School, 
  MoreVertical, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Loader2,
  MapPin,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface PartnerSchool {
  id: string;
  name: string;
  location: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<PartnerSchool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New school form state
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("Cap-Haïtien, Nord");

  useEffect(() => {
    fetchSchools();
  }, []);

  async function fetchSchools() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("partner_schools")
      .select("*")
      .order("name");
    
    if (data) setSchools(data);
    setIsLoading(false);
  }

  async function handleAddSchool(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from("partner_schools")
      .insert([{ name: newName, location: newLocation }]);

    if (!error) {
      setNewName("");
      setShowAddModal(false);
      fetchSchools();
    }
    setIsSubmitting(false);
  }

  async function toggleSchoolStatus(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from("partner_schools")
      .update({ is_active: !currentStatus })
      .eq("id", id);
    
    if (!error) fetchSchools();
  }

  async function deleteSchool(id: string) {
    if (!confirm("Are you sure you want to delete this school?")) return;
    
    const { error } = await supabase
      .from("partner_schools")
      .delete()
      .eq("id", id);
    
    if (!error) fetchSchools();
  }

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f6f0] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link href="/admin" className="text-hbf-muted flex items-center gap-2 text-sm font-bold hover:text-hbf-dark transition-colors mb-4">
              <ChevronLeft size={16} /> Dashboard
            </Link>
            <h1 className="text-4xl font-black text-hbf-dark">Partner <span className="text-hbf-green">Schools</span></h1>
            <p className="text-hbf-muted font-medium mt-1">Manage educational institutions in the HBF network.</p>
          </div>
          
          <Button 
            onClick={() => setShowAddModal(true)}
            className="rounded-full bg-hbf-green px-8 py-6 font-bold text-white shadow-lg hover:bg-hbf-green-light"
          >
            <Plus size={20} className="mr-2" /> Add New School
          </Button>
        </div>

        {/* Search & Stats */}
        <div className="grid md:grid-cols-[1fr_auto] gap-6 mb-10">
          <div className="group relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-hbf-green">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search schools by name..."
              className="w-full h-14 pl-14 pr-6 rounded-2xl border border-black/5 bg-[#f8f6f0]/50 outline-none focus:bg-white focus:border-hbf-green/30 focus:ring-4 focus:ring-hbf-green/5 transition-all duration-300 shadow-sm focus:shadow-xl text-hbf-dark font-medium placeholder:text-hbf-muted/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-white px-8 h-14 rounded-2xl border border-black/5 flex items-center gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-hbf-green/10 flex items-center justify-center text-hbf-green">
              <School size={16} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-hbf-dark leading-none">{schools.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-hbf-muted">Schools</span>
            </div>
          </div>
        </div>


        {/* Content Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-hbf-muted">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="font-bold">Loading schools...</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-black/5 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f6f0]/50 border-b border-black/5">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-hbf-muted">School Name</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-hbf-muted">Location</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-hbf-muted">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-hbf-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredSchools.map((school, index) => (
                      <motion.tr 
                        key={school.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group border-b border-black/5 last:border-0 hover:bg-[#f8f6f0]/30 transition-colors"
                      >
                        <td className="px-8 py-6">
                          <span className={`font-bold text-lg ${school.is_active ? 'text-hbf-dark' : 'text-hbf-muted line-through'}`}>
                            {school.name}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-hbf-muted font-bold text-xs uppercase tracking-wider">
                            {school.location}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <Badge variant={school.is_active ? "success" : "secondary"} className="text-[10px] px-3 py-1 font-black uppercase tracking-widest">
                            {school.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleSchoolStatus(school.id, school.is_active)}
                              className={`rounded-xl h-10 px-4 font-bold text-xs ${school.is_active ? 'text-hbf-orange hover:bg-hbf-orange/10' : 'text-hbf-green hover:bg-hbf-green/10'}`}
                            >
                              {school.is_active ? "Deactivate" : "Activate"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteSchool(school.id)}
                              className="rounded-xl h-10 w-10 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            {filteredSchools.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-hbf-muted font-bold">No schools found matching your search.</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Add School Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-hbf-dark/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-black text-hbf-dark mb-2">New School</h2>
              <p className="text-hbf-muted font-medium mb-8">Add a prestigious partner institution.</p>
              
              <form onSubmit={handleAddSchool} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hbf-dark px-1">School Name</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    placeholder="Enter school name..."
                    className="w-full px-6 py-4 rounded-2xl border border-black/10 bg-[#f8f6f0]/30 outline-none focus:border-hbf-green transition-all"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hbf-dark px-1">Location</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Location (e.g. Cap-Haïtien)"
                    className="w-full px-6 py-4 rounded-2xl border border-black/10 bg-[#f8f6f0]/30 outline-none focus:border-hbf-green transition-all"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 h-14 rounded-2xl font-bold text-hbf-muted"
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={isSubmitting}
                    className="flex-1 h-14 rounded-2xl bg-hbf-green font-bold text-white shadow-lg hover:bg-hbf-green-light"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Add School"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
