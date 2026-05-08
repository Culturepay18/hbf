"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Mail, Shield, Calendar, Loader2, X, Save, Lock, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { createAdminUser, deleteAdminUser, resetAdminPassword } from "@/lib/actions/users";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resettingUser, setResettingUser] = useState<{id: string, email: string} | null>(null);
  
  // Form States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, email, role, created_at")
      .order("created_at", { ascending: false });
    if (data) setUsers(data);
    setIsLoading(false);
  }

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(pass)) return "Password must contain at least one number.";
    return null;
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const result = await createAdminUser(formData);

    if (result.success) {
      await fetchUsers();
      setIsModalOpen(false);
      resetForm();
    } else {
      setError(result.error || "Failed to create user");
    }
    setIsSaving(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;
    setError(null);

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setIsSaving(true);
    const result = await resetAdminPassword(resettingUser.id, password);
    
    if (result.success) {
      setIsResetModalOpen(false);
      resetForm();
      alert(`Password for ${resettingUser.email} has been reset.`);
    } else {
      setError(result.error || "Failed to reset password");
    }
    setIsSaving(false);
  };

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const handleDelete = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to remove ${email}?`)) {
      const result = await deleteAdminUser(id);
      if (result.success) fetchUsers();
      else alert(result.error);
    }
  };

  const inp = "w-full rounded-xl border border-black/10 bg-[#f8f6f0] px-4 py-2.5 text-sm text-hbf-dark outline-none transition focus:border-hbf-green focus:bg-white";
  const lbl = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-hbf-muted";

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-hbf-dark">Administrators</h1>
          <p className="mt-1 text-hbf-muted">Manage team access and permissions.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 rounded-xl bg-hbf-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-black/80 transform hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Add New Admin
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-hbf-green" size={48} />
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-black/5 shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8f6f0]/50 border-b border-black/5">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-hbf-muted">User</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-hbf-muted">Role</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-hbf-muted">Joined</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-hbf-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8f6f0]/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-hbf-cream flex items-center justify-center">
                        <Mail size={18} className="text-hbf-dark/40" />
                      </div>
                      <span className="font-bold text-hbf-dark">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-hbf-green" />
                      <span className="text-sm font-medium">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-hbf-muted">
                      <Calendar size={14} />
                      <span className="text-sm">{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          resetForm();
                          setResettingUser({id: user.id, email: user.email});
                          setIsResetModalOpen(true);
                        }}
                        className="p-2 rounded-xl text-hbf-orange hover:bg-hbf-orange/10 transition-all"
                        title="Reset Password"
                      >
                        <Key size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.email)}
                        className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        title="Remove Access"
                      >
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

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 mx-4 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="bg-hbf-dark p-10 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">New Administrator</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <p className="text-white/60 text-sm">Create a new account for your team.</p>
            </div>

            <form onSubmit={handleCreateUser} className="p-10 space-y-8">
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-xs text-red-600 font-bold flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={lbl}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-hbf-muted" size={16} />
                    <input name="email" type="email" className={`${inp} pl-11`} placeholder="name@hbfhaiti.org" required />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Permissions Role</label>
                  <select name="role" className={inp}>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={lbl}>Initial Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-hbf-muted" size={16} />
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inp} pl-11`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-hbf-muted" size={16} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`${inp} pl-11`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f6f0] p-6 rounded-2xl border border-black/5">
                <p className="text-xs font-bold uppercase tracking-wider text-hbf-muted mb-4">Security Criteria:</p>
                <div className="grid sm:grid-cols-3 gap-4 text-[11px] font-bold">
                  <div className={`flex items-center gap-2 ${password.length >= 8 ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {password.length >= 8 ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {/[A-Z]/.test(password) ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${/[0-9]/.test(password) ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {/[0-9]/.test(password) ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} One number
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving || password !== confirmPassword || password.length < 8}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-hbf-green py-5 font-bold text-white shadow-xl transition hover:bg-hbf-green-light disabled:opacity-50 transform hover:-translate-y-0.5"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  {isSaving ? "Creating Account..." : "Create Administrator Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {isResetModalOpen && resettingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsResetModalOpen(false)} />
          <div className="relative z-10 mx-4 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="bg-hbf-orange p-10 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Reset Password</h3>
                <button onClick={() => setIsResetModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <p className="text-white/90 text-sm">Updating password for <strong>{resettingUser.email}</strong></p>
            </div>

            <form onSubmit={handleResetPassword} className="p-10 space-y-8">
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-xs text-red-600 font-bold flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={lbl}>New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-hbf-muted" size={16} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inp} pl-11`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-hbf-muted" size={16} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`${inp} pl-11`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f6f0] p-6 rounded-2xl border border-black/5">
                <p className="text-xs font-bold uppercase tracking-wider text-hbf-muted mb-4">Security Criteria:</p>
                <div className="grid sm:grid-cols-3 gap-4 text-[11px] font-bold">
                  <div className={`flex items-center gap-2 ${password.length >= 8 ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {password.length >= 8 ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {/[A-Z]/.test(password) ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${/[0-9]/.test(password) ? "text-hbf-green" : "text-hbf-muted"}`}>
                    {/[0-9]/.test(password) ? <CheckCircle2 size={14} /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-black/10" />} One number
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving || password !== confirmPassword || password.length < 8}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-hbf-orange py-5 font-bold text-white shadow-xl transition hover:bg-hbf-orange-light disabled:opacity-50 transform hover:-translate-y-0.5"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  {isSaving ? "Updating Password..." : "Confirm New Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
