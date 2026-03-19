"use client";
import { LayoutProps } from "@/types";
import ProtectedRoute from "@/Protected/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Admin({ children }: LayoutProps) {
  const activePath = usePathname();

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[#081028]">
        <aside className="w-64 bg-[#081028] text-white p-4 flex flex-col border-2 border-[#1a1c23]/60">
          <div className="mb-4">
            <Link href={"/admin"} className="text-[35px]">
              Admin Panel
            </Link>
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/admin/admin-projects"
              className="px-3 py-2 border rounded border-[#a1a1a1]/60 flex items-center hover:border-[#CB3CFF]"
              style={{
                opacity: activePath.startsWith("/admin/admin-projects")
                  ? 0.5
                  : 1,
              }}
            >
              Projects
            </Link>
            <Link
              href="/admin/admin-about"
              className="px-3 py-2 border border-[#a1a1a1]/60 rounded flex items-center hover:border-[#CB3CFF]"
              style={{
                opacity: activePath.startsWith("/admin/admin-about") ? 0.5 : 1,
              }}
            >
              About
            </Link>
            <Link
              href="/admin/admin-skills"
              className="px-3 py-2 border  border-[#a1a1a1]/60 rounded flex items-center hover:border-[#CB3CFF]"
              style={{
                opacity: activePath.startsWith("/admin/admin-skills") ? 0.5 : 1,
              }}
            >
              Skills
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-[#081028]">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

export default Admin;
