"use client";

import UserOrderClient from "../../../user/[userId]/UserOrderClient";


export default function MyOrderPage({ params }: { params?: { userId: string } }) {
  // params.userId ممکنه از route dynamic باشه
  const userId = params?.userId || "guest";

  return <UserOrderClient userId={userId} />;
}
