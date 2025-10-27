import MyOrders from "../../MyOrder/page";


interface PageProps {
  params: {
    userId: string;
  };
}

export default function MyOrderPage({ params }: PageProps) {
  return <MyOrders userId={params.userId} />;
}
