"use client";
import { LayoutProps } from "@/types";
import ProtectedRoute from "@/Protected/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Admin({ children }: LayoutProps) {
  const activePath = usePathname();
  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[#081028]">
        <aside className="w-75 bg-[#081028] text-white p-4 flex flex-col border-2 border-[#1a1c23]/60">
          <div className="mb-4">
            <Link href={"/admin"} className="text-[35px]">
              Admin Panel
            </Link>
          </div>
          <nav className="flex flex-col gap-4 relative">
            <Link
              href="/admin/admin-projects"
              className="border relative pl-3.5 h-10.5 rounded duration-300 transition-border border-[#2b2c2d]/60 flex items-center hover:border-[#CB3CFF]"
              style={{
                backgroundColor:
                  activePath === "/admin/admin-projects"
                    ? "#0A1330"
                    : "transparent",
              }}
            >
              {activePath === "/admin/admin-projects" ? (
                <img
                  src="/link-active.svg"
                  alt="Link background"
                  className="absolute left-0"
                />
              ) : (
                []
              )}
              Projects
            </Link>
            <Link
              href="/admin/admin-about"
              className="h-10.5 pl-3.5 border duration-300 transition-border border-[#2b2c2d]/60 rounded flex items-center hover:border-[#CB3CFF]"
              style={{
                backgroundColor:
                  activePath === "/admin/admin-about"
                    ? "#0A1330"
                    : "transparent",
              }}
            >
              {activePath === "/admin/admin-about" ? (
                <img
                  src="/link-active.svg"
                  alt="Link background"
                  className="absolute left-0"
                />
              ) : (
                []
              )}
              About
            </Link>
            <Link
              href="/admin/admin-skills"
              className="border relative pl-3.5 h-10.5 duration-300 transition-border border-[#2b2c2d]/60 rounded flex items-center hover:border-[#CB3CFF]"
              style={{
                backgroundColor:
                  activePath === "/admin/admin-skills"
                    ? "#0A1330"
                    : "transparent",
              }}
            >
              {activePath === "/admin/admin-skills" ? (
                <img
                  src="/link-active.svg"
                  alt="Link background"
                  className="absolute left-0"
                />
              ) : (
                []
              )}
              Skills
            </Link>
          </nav>
          <div className="fixed bottom-4">
            <button
              onClick={() => logout()}
              className="cursor-pointer flex gap-2 items-center w-[241px] h-[46px] justify-center hover:bg-transparent duration-300 transition-all border-transparent border hover:border-[#CB3CFF]/40 active:opacity-60 rounded-sm bg-[#CB3CFF]"
            >
              Chiqish
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.76001 12.0601H19.93"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-[#081028]">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

export default Admin;
