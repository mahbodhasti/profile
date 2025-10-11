// مسیر پیشنهادی: src/app/admin/posts/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminPostsPage.module.css";

interface PostType {
  _id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    if (!newPost.title || !newPost.content) return alert("عنوان و محتوا را وارد کنید");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await res.json();
    if (data.success) {
      setNewPost({ title: "", content: "" });
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchPosts();
  };

  const handleEdit = (post: PostType) => setEditingId(post._id);

  const handleUpdate = async (id: string, updated: { title: string; content: string }) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    if (data.success) {
      setEditingId(null);
      fetchPosts();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>مدیریت پست‌ها</h1>

      {/* فرم ایجاد پست جدید */}
      <div className={styles.newPost}>
        <input
          placeholder="عنوان"
          value={newPost.title}
          onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="محتوا"
          value={newPost.content}
          onChange={e => setNewPost(prev => ({ ...prev, content: e.target.value }))}
        />
        <button onClick={handleCreate} className={styles.createBtn}>ایجاد پست</button>
      </div>

      {/* جدول پست‌ها */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>محتوا</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p._id}>
                <td>
                  {editingId === p._id ? (
                    <input
                      value={p.title}
                      onChange={e => setPosts(posts.map(post => post._id === p._id ? { ...post, title: e.target.value } : post))}
                    />
                  ) : p.title}
                </td>
                <td>
                  {editingId === p._id ? (
                    <textarea
                      value={p.content}
                      onChange={e => setPosts(posts.map(post => post._id === p._id ? { ...post, content: e.target.value } : post))}
                    />
                  ) : p.content}
                </td>
                <td>{new Date(p.createdAt).toLocaleString("fa-IR")}</td>
                <td className={styles.actions}>
                  {editingId === p._id ? (
                    <button className={styles.confirm} onClick={() => handleUpdate(p._id, { title: p.title, content: p.content })}>ذخیره</button>
                  ) : (
                    <>
                      <button className={styles.confirm} onClick={() => handleEdit(p)}>ویرایش</button>
                      <button className={styles.delete} onClick={() => handleDelete(p._id)}>حذف</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
