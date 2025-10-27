"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number | string;
  image: string;
  userId?: string;
  onCartUpdated?: () => void;
}

export default function ProductCard({
  _id,
  title,
  price,
  image,
  userId = "demo-user",
  onCartUpdated,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);

      // تبدیل price به number امن
      let safePrice = Number(String(price).replace(/[^\d.]/g, ""));
      if (isNaN(safePrice)) safePrice = 0;

      await axios.post("/api/cart", {
        userId,
        product: {
          productId: _id,
          title,
          price: safePrice,
          image,
          quantity: 1,
        },
      });

      toast.success("✅ محصول به سبد خرید اضافه شد!");
      if (onCartUpdated) onCartUpdated();
    } catch (err: any) {
      console.error("❌ handleAdd error:", err.message);
      toast.error("خطا در افزودن محصول به سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3 flex flex-col items-center">
      <div className="w-full h-48 relative mb-3 overflow-hidden rounded-xl">
        <Image
          src={image || "/sample.jpg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
        {title}
      </h3>

      <p className="text-primary font-bold text-base mt-2">
        {Number(price).toLocaleString("fa-IR")} تومان
      </p>

      <button
        onClick={handleAdd}
        disabled={loading}
        className={`mt-4 w-full py-2 rounded-xl text-white font-medium ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 transition"
        }`}
      >
        {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}
