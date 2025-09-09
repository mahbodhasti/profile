import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from './../utils/aos';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "lor_of_programme",
  description: "mahbod hasti lord_of_programmer",

  icons: {
    icon: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
