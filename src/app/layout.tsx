import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "o-mohamed-mmb-vdscsasc",
  description: "Next.js app with TypeScript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Registration App
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-accent-foreground transition-colors">
                Home
              </Link>
              <Link href="/register" className="hover:text-accent-foreground transition-colors">
                Register
              </Link>
            </div>
          </div>
        </nav>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

