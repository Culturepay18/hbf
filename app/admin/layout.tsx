import { Sidebar } from "@/components/admin/Sidebar";
import { AuthProvider } from "@/components/admin/AuthProvider";

export const metadata = {
  title: "Admin Panel | Haiti Bright Futures",
  description: "Manage content for Haiti Bright Futures",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-[#f8f6f0]">
        {/* Sidebar (Fixed on Desktop) */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
