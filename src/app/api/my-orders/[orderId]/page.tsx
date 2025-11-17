import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import MyOrders from "../../../../components/MyOrders";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>شما وارد نشده‌اید. لطفا لاگین کنید.</p>;
  }

  return <MyOrders userId={session.user.id} />;
}
