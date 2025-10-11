// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";
;

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await connectDB();
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    return NextResponse.json({ message: "محصول حذف شد" });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json({ error: "خطا در حذف محصول" }, { status: 500 });
  }
}
