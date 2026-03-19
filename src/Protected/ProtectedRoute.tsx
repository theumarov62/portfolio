"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}
