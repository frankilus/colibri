import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminNav from "./AdminNav";

export const metadata = {
  title: { default: "Admin", template: "%s | Colibri Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get("admin_auth")?.value === "1";

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {process.env.NODE_ENV !== "production" && (
        <div className="bg-amber-400 text-amber-900 px-4 py-2 text-xs font-semibold text-center">
          ⚠️ DEVELOPMENT MODE — Placeholder password auth only. Replace with real
          authentication (Auth.js, Clerk, etc.) before deploying to production.
        </div>
      )}
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}
