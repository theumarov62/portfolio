"use client";
import { LayoutProps } from "@/types";
import ProtectedRoute from "@/Protected/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function Admin({ children }: LayoutProps) {
  const activePath = usePathname();
  const router = useRouter();
  const [logoutModal, setLogoutModal] = useState<Boolean>(false);
  function logout() {
    router.push("/auth/login");
    return localStorage.removeItem("token");
  }

  return (
    <ProtectedRoute>
      {logoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0A1330] p-6 gap-4 flex flex-col items-center rounded-xl w-[350px]">
            <h2 className="text-white text-lg text-center font-semibold mb-3">
              Chiqishni tasdiqlaysizmi?
            </h2>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setLogoutModal(false)}
                className="px-4 py-2 rounded cursor-pointer bg-gray-600 text-white"
              >
                Bekor qilish
              </button>

              <button
                className="px-4 py-2 rounded cursor-pointer bg-red-600 text-white"
                onClick={() => logout()}
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-svh bg-[#081028]">
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
            <Link
              href="/admin/admin-experiences"
              className="border relative pl-3.5 h-10.5 duration-300 transition-border border-[#2b2c2d]/60 rounded flex items-center hover:border-[#CB3CFF]"
              style={{
                backgroundColor:
                  activePath === "/admin/admin-experiences"
                    ? "#0A1330"
                    : "transparent",
              }}
            >
              {activePath === "/admin/admin-experiences" ? (
                <img
                  src="/link-active.svg"
                  alt="Link background"
                  className="absolute left-0"
                />
              ) : (
                []
              )}
              Experiences
            </Link>
          </nav>
          <div className="fixed bottom-4">
            <button
              onClick={() => setLogoutModal(true)}
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
      <Toaster position="top-right" />
    </ProtectedRoute>
  );
}

export default Admin;
