"use client";
import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import Link from "next/link";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [author, setAuthor] = useState("Mahbod");

  const fetchPosts = async () => {
    const res = await fetch("/api/post");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });
      const data = await res.json();
      if (res.ok) {
        setTitle("");
        setContent("");
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.page}>
      <Link className={styles.button} href="/" >خانه</Link>
      <div className={styles.card}>
        <h1 className={styles.title}>نضرات خود را به اشتراک  فرمایین</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
          <textarea
            placeholder="محتوا"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>ثبت کنید</button>
        </form>

        <h2 className={styles.title}>همه پست ها</h2>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>
            <small className={styles.postAuthor}>By: {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
