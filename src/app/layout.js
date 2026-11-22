import { Alegreya  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@heroui/react";

const alegreya  = Alegreya ({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


export const metadata = {
  title: "RecipeHub",
  description: "Discover, share and explore delicious recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${alegreya.variable} light h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-alegreya)]">
        <ToastProvider placement="top"/>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
