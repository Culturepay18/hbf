"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Lightbulb, 
  GraduationCap, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Stats {
  articles: number;
  projects: number;
  scholarships: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    projects: 0,
    scholarships: 0,
    users: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      setIsLoading(true);
      
      // Fetch Articles Count
      const { count: articlesCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });
      
      // Fetch Projects Count
      const { count: projectsCount } = await supabase
        .from("innovation_projects")
        .select("*", { count: "exact", head: true });
      
      // Fetch Open Scholarships Count
      const { count: scholarshipsCount } = await supabase
        .from("scholarships")
        .select("*", { count: "exact", head: true })
        .eq("status", "Open");
      
      // Fetch Users Count
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        articles: articlesCount || 0,
        projects: projectsCount || 0,
        scholarships: scholarshipsCount || 0,
        users: usersCount || 0
      });
      
      setIsLoading(false);
    }

    fetchDashboardStats();
  }, []);

  const cards = [
    { 
      label: "Total Articles", 
      value: stats.articles, 
      icon: FileText, 
      color: "bg-blue-500", 
      trend: "+2 this week", 
      isUp: true 
    },
    { 
      label: "Active Projects", 
      value: stats.projects, 
      icon: Lightbulb, 
      color: "bg-hbf-orange", 
      trend: "Innovation Lab", 
      isUp: true 
    },
    { 
      label: "Open Scholarships", 
      value: stats.scholarships, 
      icon: GraduationCap, 
      color: "bg-hbf-green", 
      trend: "Currently accepting", 
      isUp: true 
    },
    { 
      label: "Admin Users", 
      value: stats.users, 
      icon: Users, 
      color: "bg-purple-500", 
      trend: "Team members", 
      isUp: true 
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-hbf-green" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-hbf-dark">Dashboard Overview</h1>
        <p className="mt-1 text-hbf-muted">Welcome back! Here&apos;s what&apos;s happening with HBF today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="relative overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-soft transition-all hover:shadow-lg group">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl ${card.color} p-2.5 text-white transition-transform group-hover:scale-105`}>
                <card.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${card.isUp ? "text-hbf-green" : "text-red-500"}`}>
                {card.trend}
                {card.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-hbf-muted">{card.label}</p>
              <h3 className="mt-0.5 text-3xl font-black text-hbf-dark tracking-tight">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-soft">
          <h3 className="text-xl font-bold text-hbf-dark mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0">
                <div className="h-10 w-10 rounded-full bg-hbf-cream flex items-center justify-center text-hbf-dark font-bold">
                  {i}
                </div>
                <div>
                  <p className="text-sm font-bold text-hbf-dark">Content updated successfully</p>
                  <p className="text-xs text-hbf-muted">Your latest changes are now live on the website.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-black/5 bg-hbf-dark p-8 shadow-soft text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Need help?</h3>
            <p className="text-white/60 text-sm mb-8">Access the documentation or contact support for assistance with the CMS.</p>
          </div>
          <button className="w-full py-4 rounded-2xl bg-white text-hbf-dark font-bold text-sm hover:bg-hbf-cream transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
