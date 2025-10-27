import MyOrders from "../../p-user/page";


interface PageProps {
  params: {
    userId: string;
  };
}

export default function MyOrderPage({ params }: PageProps) {
  // حتماً کامپوننت React برگشت داده می‌شود
  return <MyOrders userId={params.userId} />;
}
