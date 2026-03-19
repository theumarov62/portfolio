"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("token", "123234");
  }, []);
  return <section>Home</section>;
}
