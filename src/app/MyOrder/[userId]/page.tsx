import MyOrders from "../page";

interface PageProps {
  params: { userId: string };
}

export default function MyOrderPage({ params }: PageProps) {
  return <MyOrders userId={params.userId} />;
}
