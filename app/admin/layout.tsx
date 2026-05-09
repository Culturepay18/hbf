import { AuthProvider } from "@/components/admin/AuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";

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
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
