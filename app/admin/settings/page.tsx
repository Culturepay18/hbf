"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminSettings() {
  const [formEnabled, setFormEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "scholarship_status")
      .single();
    
    if (data) {
      setFormEnabled(data.value.is_active);
    } else if (error && error.code !== "PGRST116") { // PGRST116 is "not found"
      setError("Table 'site_settings' not found. Please run the SQL migration.");
    }
    setIsLoading(false);
  }

  async function handleSave() {
    setIsSaving(true);
    setError(null);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ 
        key: "scholarship_status", 
        value: { is_active: formEnabled } 
      });

    if (error) {
      setError(error.message);
    } else {
      alert("Settings saved successfully!");
    }
    setIsSaving(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-hbf-dark">Global Settings</h1>
        <p className="mt-2 text-hbf-muted">Manage global site configurations and behaviors.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold">Error</p>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-soft">
        <h2 className="text-xl font-bold text-hbf-dark">Scholarship Application</h2>
        <p className="mt-2 text-sm text-hbf-muted">
          Enable or disable the scholarship application form. When disabled, users will see a "Competition Finished" message.
        </p>
        
        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <Loader2 className="animate-spin text-hbf-green" size={32} />
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-black/10 p-5">
              <div>
                <p className="font-semibold text-hbf-dark">Form Status</p>
                <p className="text-sm text-hbf-muted">
                  {formEnabled ? "Currently accepting applications" : "Submissions are currently closed"}
                </p>
              </div>
              <button
                onClick={() => setFormEnabled(!formEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                  formEnabled ? "bg-hbf-green" : "bg-black/20"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    formEnabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-xl bg-hbf-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hbf-dark/90 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
