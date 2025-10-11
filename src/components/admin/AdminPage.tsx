"use client";
import { useEffect, useState } from "react";
import styles from "./admin.module.css";

interface Product {
  _id: string;
  title: string;
  image: string;
  alt: string;
  price: string;
  rating: number;
  description: string;
  option: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product,"_id">>({
    title:"", image:"", alt:"", price:"", rating:5, description:"", option:"A"
  });
  const [editingId, setEditingId] = useState<string|null>(null);

  useEffect(()=>{ fetchProducts(); }, []);

  async function fetchProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  }

  async function saveProduct() {
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { _id: editingId, ...form } : form;
    const res = await fetch("/api/admin/products", {
      method, headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)
    });
    const data = await res.json();
    if(data.ok){
      fetchProducts();
      setForm({ title:"", image:"", alt:"", price:"", rating:5, description:"", option:"A" });
      setEditingId(null);
    } else alert(data.error);
  }

  async function deleteProduct(id:string){
    if(!confirm("آیا از حذف محصول مطمئن هستید؟")) return;
    const res = await fetch("/api/admin/products",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({_id:id})
    });
    const data = await res.json();
    if(data.ok) fetchProducts();
  }

  function editProduct(p:Product){
    setEditingId(p._id);
    setForm({ title:p.title, image:p.image, alt:p.alt, price:p.price, rating:p.rating, description:p.description, option:p.option });
  }

  return (
    <div className={styles.container}>
      <h2>پنل مدیریت محصولات</h2>

      <div className={styles.form}>
        <input placeholder="عنوان" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="لینک تصویر" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
        <input placeholder="Alt تصویر" value={form.alt} onChange={e=>setForm({...form,alt:e.target.value})} />
        <input placeholder="قیمت" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input type="number" placeholder="رتبه" value={form.rating} onChange={e=>setForm({...form,rating:+e.target.value})} />
        <textarea placeholder="توضیحات" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea>
        <div>
          <label><input type="radio" value="A" checked={form.option==="A"} onChange={e=>setForm({...form,option:e.target.value})}/> گزینه A</label>
          <label><input type="radio" value="B" checked={form.option==="B"} onChange={e=>setForm({...form,option:e.target.value})}/> گزینه B</label>
        </div>
        <button onClick={saveProduct}>{editingId?"ویرایش":"افزودن"}</button>
      </div>

      <div className={styles.list}>
        {products.map(p=>(
          <div key={p._id} className={styles.productItem}>
            <strong>{p.title} - {p.price} - {p.option}</strong>
            <p>Alt: {p.alt}</p>
            <p>{p.description}</p>
            <button onClick={()=>editProduct(p)}>ویرایش</button>
            <button onClick={()=>deleteProduct(p._id)}>حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
}
