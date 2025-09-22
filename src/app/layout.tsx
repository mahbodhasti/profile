import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "./../utils/aos";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "lor_of_programme",
  description: "وبسایت مهبد هستی",
  verification: {
    google: "RY6NrlqGQntGaA4V2b3ivViB5cYg4KfLX-9bahNmKc4", // همین توکن واقعی
  },
  icons: {
    icon: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
