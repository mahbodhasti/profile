"use client";

import UserOrderClient from "./UserOrderClient";


export default function UserPage({ params }: { params: { userId: string } }) {
  return <UserOrderClient userId={params.userId} />;
}
