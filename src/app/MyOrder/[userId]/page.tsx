// src/app/MyOrder/[userId]/page.tsx
import { getServerSession } from "next-auth";
import { connectDB } from "../../../../lib/mongodb";
import { authOptions } from "../../../../lib/auth";
import Order from "../../../../models/Order";

interface ParamsPromise {
  params: Promise<{ userId: string }>;
}

export default async function MyOrderPage(props: ParamsPromise) {
  // ✅ unwrap کردن params چون الان Promise هست
  const { params } = props;
  const { userId } = await params;

  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.id !== userId) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        شما اجازه دسترسی به این صفحه را ندارید.
      </p>
    );
  }

  const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", direction: "rtl" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>سفارش‌های من</h2>

      {orders.length === 0 && <p style={{ textAlign: "center" }}>هیچ سفارشی ثبت نشده است.</p>}

      {orders.map((order: any) => (
        <div key={order._id} style={{ border: "1px solid #ddd", padding: 18, marginBottom: 18, borderRadius: 10 }}>
          <p><strong>شماره تراکنش:</strong> {order.transactionId}</p>
          <p><strong>تاریخ تراکنش:</strong> {new Date(order.transactionDate || order.createdAt).toLocaleString("fa-IR")}</p>
          <p><strong>جمع کل:</strong> {order.totalPrice.toLocaleString()} تومان</p>
          <p><strong>وضعیت:</strong> {order.status}</p>

          <hr style={{ margin: "12px 0" }} />

          <h4>محصولات:</h4>
          <ul>
            {order.items.map((it: any, i: number) => (
              <li key={i}>
                {it.name} × {it.quantity} — {(it.price * it.quantity).toLocaleString()} تومان
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
