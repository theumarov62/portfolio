"use client";
import { LoginServices } from "@/services/login";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PageLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      const res = await LoginServices.postLogin({ email, password });
      const token = res.data.access;
      console.log("Token", token);
      localStorage.setItem("token", token);
      router.push("/admin");
    } catch (err) {
      console.log("Xatolik ", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081028]">
      <div className="bg-[#0A1330] p-8 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            autoComplete="off"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded bg-[#08182D] text-white outline-none border border-gray-600 focus:border-purple-500"
          />

          <input
            type="password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-3 rounded bg-[#08182D] text-white outline-none border border-gray-600 focus:border-purple-500"
          />

          <button
            type="submit"
            className="mt-4 p-3 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default PageLogin;
