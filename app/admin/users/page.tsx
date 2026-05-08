"use client";

import { Plus } from "lucide-react";

export default function AdminUsers() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Administrators</h1>
          <p className="mt-2 text-hbf-muted">Manage access to the admin panel.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-hbf-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hbf-dark/90">
          <Plus size={18} />
          Invite User
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-hbf-muted">
            <thead className="bg-[#f8f6f0] text-xs uppercase text-hbf-dark">
              <tr>
                <th className="px-6 py-4 font-bold">User Email</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr className="transition-colors hover:bg-black/[0.02]">
                <td className="px-6 py-4 font-semibold text-hbf-dark">admin@hbfhaiti.org</td>
                <td className="px-6 py-4">Admin</td>
                <td className="px-6 py-4">May 8, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
