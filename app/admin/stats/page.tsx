"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Users, UserCheck, Trophy, Globe, ArrowLeft, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stat {
  id: string;
  label: string;
  value: number;
  icon_name: string;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setIsLoading(true);
    const { data } = await supabase.from("scholarship_stats").select("*").order("id", { ascending: true });
    if (data) setStats(data);
    setIsLoading(false);
  }

  const handleUpdateValue = (id: string, newValue: number) => {
    setStats(stats.map(s => s.id === id ? { ...s, value: newValue } : s));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    for (const stat of stats) {
      await supabase.from("scholarship_stats").update({ value: stat.value }).eq("id", stat.id);
    }
    setIsSaving(false);
    alert("All statistics updated successfully!");
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Users": return <Users size={24} className="text-hbf-green" />;
      case "UserCheck": return <UserCheck size={24} className="text-hbf-orange" />;
      case "Trophy": return <Trophy size={24} className="text-hbf-brown" />;
      case "Globe": return <Globe size={24} className="text-hbf-green" />;
      default: return <Users size={24} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Site Statistics</h1>
          <p className="text-hbf-muted font-medium">Manage the live counters displayed on the public website.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-hbf-green" size={48} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-3xl border border-black/5 p-8 shadow-soft flex items-center justify-between group hover:border-hbf-green/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-[#f8f6f0] flex items-center justify-center transition-transform group-hover:scale-110">
                    {getIcon(stat.icon_name)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">{stat.label}</p>
                    <p className="text-sm font-medium text-black/40">Current: {stat.value}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleUpdateValue(stat.id, Math.max(0, stat.value - 1))}
                    className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold text-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={stat.value} 
                    onChange={(e) => handleUpdateValue(stat.id, parseInt(e.target.value) || 0)}
                    className="w-20 text-center bg-[#f8f6f0] border-none rounded-xl py-2 font-black text-xl text-hbf-dark focus:ring-2 focus:ring-hbf-green outline-none"
                  />
                  <button 
                    onClick={() => handleUpdateValue(stat.id, stat.value + 1)}
                    className="h-10 w-10 rounded-xl bg-hbf-green/10 text-hbf-green flex items-center justify-center font-bold text-xl hover:bg-hbf-green hover:text-white transition-all active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-end gap-4">
            <button 
              onClick={fetchStats}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/5 text-hbf-dark font-bold hover:bg-black/10 transition-all"
            >
              <RefreshCw size={18} /> Discard Changes
            </button>
            <button 
              onClick={handleSaveAll}
              disabled={isSaving}
              className="flex items-center gap-2 px-10 py-3 rounded-2xl bg-hbf-dark text-white font-bold shadow-xl hover:bg-hbf-dark/90 transition-all disabled:opacity-50 transform hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? "Saving..." : "Save All Statistics"}
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 p-6 bg-hbf-green/5 border border-hbf-green/10 rounded-[2rem]">
        <h4 className="font-bold text-hbf-green mb-2 flex items-center gap-2">
          <RefreshCw size={16} /> Automation Active
        </h4>
        <p className="text-sm text-hbf-muted leading-relaxed">
          The <span className="font-bold text-hbf-dark">Applicants</span> count increases automatically whenever a student submits the application form. You can still override it manually here if needed.
        </p>
      </div>
    </div>
  );
}
