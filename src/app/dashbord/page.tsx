"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">در حال بارگذاری...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">سلام {session?.user?.name} 👋</h1>
      <p className="mt-4 text-gray-600">به داشبورد خوش اومدی!</p>
      <p className="text-sm text-gray-400 mt-2">ایمیل: {session?.user?.email}</p>
    </div>
  );
}
