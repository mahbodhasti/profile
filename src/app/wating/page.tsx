// src/app/user/waiting/page.tsx
export default function WaitingPage() {
  return (
    <div style={{padding:32,display:"flex",justifyContent:"center"}}>
      <div style={{maxWidth:720,background:"#fff",padding:24,borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,0.06)"}}>
        <h2>سفارش شما ثبت شد</h2>
        <p>سفارش شما در وضعیت <strong>در انتظار تأیید ادمین</strong> قرار دارد. به محض تأیید، با شما تماس گرفته خواهد شد.</p>
        <p>متشکریم از خرید شما 🎉</p>
      </div>
    </div>
  );
}
