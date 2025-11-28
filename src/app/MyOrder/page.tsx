"use client";

import { useSession } from "next-auth/react";

export default function MyOrders() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p style={{ textAlign: "center", marginTop: 50 }}>در حال بارگذاری...</p>;
  }

  if (!session?.user?.id) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        شما وارد نشده‌اید. لطفا لاگین کنید.
      </p>
    );
  }

  return (
    <div>
      <h1>سفارش‌های من</h1>
      <p>شناسه یوزر: {session.user.id}</p>

      {/* بقیه لیست سفارش‌ها اینجا */}
    </div>
  );
}
