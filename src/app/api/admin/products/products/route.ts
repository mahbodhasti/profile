
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import Product from "../../../../../../models/Product";

connectDB();

export async function GET() {
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ ok: true, product: newProduct });
  } catch(e:any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { _id, ...data } = await req.json();
    const updated = await Product.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json({ ok: true, product: updated });
  } catch(e:any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();
    await Product.findByIdAndDelete(_id);
    return NextResponse.json({ ok: true });
  } catch(e:any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
