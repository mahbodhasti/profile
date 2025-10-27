"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

export default function StickyCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const handleDelete = (id: string) => {
    const updated = items.filter((item) => item.productId !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-xl w-72">
      <h3 className="font-bold text-lg mb-2">🛒 سبد خرید</h3>

      {items.length === 0 ? (
        <p className="text-gray-500">سبد خرید شما خالی است</p>
      ) : (
        <>
          <ul className="max-h-48 overflow-y-auto space-y-2">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center border-b pb-1"
              >
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity} × {item.price.toLocaleString()} تومان
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="text-red-500 text-sm"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-3 font-bold">
            <span>مجموع:</span>
            <span>{total.toLocaleString()} تومان</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition"
          >
            ثبت سفارش
          </button>
        </>
      )}
    </div>
  );
}
