"use client";

import { LayoutDashboard, FileText, Lightbulb, GraduationCap, Users, Settings, LogOut, RefreshCw, Trophy, School } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { useAuth } from "./AuthProvider";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Articles & News", href: "/admin/articles", icon: FileText },
  { name: "Finalist Teams", href: "/admin/finalists", icon: Trophy },
  { name: "Lab Projects", href: "/admin/projects", icon: Lightbulb },
  { name: "Site Stats", href: "/admin/stats", icon: RefreshCw },
  { name: "Scholarships", href: "/admin/scholarships", icon: GraduationCap },
  { name: "Partner Schools", href: "/admin/schools", icon: School },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];


export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-[#1A1A1A] text-white">
      {/* Logo Area */}
      <div className="flex shrink-0 flex-col items-center px-6 pt-8 pb-4">
        <Link href="/admin" className="flex flex-col items-center">
          <Image
            src="/images/logo-hbf-01.png"
            alt="HBF Logo"
            width={119}
            height={170}
            className="h-20 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-hbf-green text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-white" : "text-white/50 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5 shrink-0 text-white/50" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
