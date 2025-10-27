"use client";
import { useState } from "react";

export default function ConfirmationForm() {
  const [userPhone, setUserPhone] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/confirmations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPhone, recipientPhone }),
    });
    alert("درخواست ثبت شد و در انتظار تایید است.");
  };

  return (
    <div>
      <input
        placeholder="شماره شما"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
      />
      <input
        placeholder="شماره طرف مقابل"
        value={recipientPhone}
        onChange={(e) => setRecipientPhone(e.target.value)}
      />
      <button onClick={handleSubmit}>ثبت درخواست</button>
    </div>
  );
}
