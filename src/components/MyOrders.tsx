// src/app/MyOrder/[userId]/page.tsx
import MyOrders from "@/components/MyOrders"; // مسیر صحیح رو چک کن

interface PageProps {
  params: { userId: string };
}

export default function MyOrderPage({ params }: PageProps) {
  return <MyOrders userId={params.userId} />;
}
