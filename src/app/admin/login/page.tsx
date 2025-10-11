"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if(data.ok) {
      localStorage.setItem("admin-token", data.token);
      router.push("/admin"); // بعد از لاگین به صفحه Admin هدایت شود
    } else alert(data.error);
  }

  return (
    <div style={{padding:20}}>
      <h2>ورود ادمین</h2>
      <input 
        type="password" 
        placeholder="رمز عبور ادمین" 
        value={password} 
        onChange={e=>setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>ورود</button>
    </div>
  );
}
