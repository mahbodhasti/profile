import MyOrders from "../../MyOrder/page";

interface Params {
  userId: string;
}

export default function MyOrderPage({ params }: { params: Params }) {
  // حتماً کامپوننت React برگشت داده می‌شود
  return <MyOrders userId={params.userId} />;
}
