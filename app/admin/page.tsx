import { FileText, Lightbulb, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const stats = [
  { name: "Total Articles", stat: "12", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Active Projects", stat: "4", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Open Scholarships", stat: "1", icon: GraduationCap, color: "text-hbf-green", bg: "bg-hbf-green/10" },
  { name: "Admin Users", stat: "3", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-hbf-dark">Dashboard</h1>
      <p className="mt-2 text-hbf-muted">Overview of Haiti Bright Futures content and metrics.</p>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-7 w-7 ${item.color}`} aria-hidden="true" />
              </div>
              <div>
                <p className="truncate text-sm font-medium text-hbf-muted">{item.name}</p>
                <p className="mt-1 text-3xl font-bold text-hbf-dark">{item.stat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-hbf-dark">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/articles"
              className="flex items-center justify-center gap-2 rounded-xl bg-hbf-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-hbf-dark/90"
            >
              <FileText size={18} />
              Post New Article
            </Link>
            <Link
              href="/admin/scholarships"
              className="flex items-center justify-center gap-2 rounded-xl bg-hbf-green px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-hbf-green-light"
            >
              <GraduationCap size={18} />
              Manage Scholarships
            </Link>
          </div>
        </div>

        {/* Global Settings Status */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-hbf-dark">System Status</h2>
          <div className="mt-6">
            <div className="flex items-center justify-between rounded-xl border border-black/5 p-4">
              <div>
                <p className="font-semibold text-hbf-dark">Scholarship Submissions</p>
                <p className="text-sm text-hbf-muted">Currently accepting new applications</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hbf-green opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-hbf-green"></span>
                </span>
                <span className="text-sm font-bold text-hbf-green">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
