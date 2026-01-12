import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import Link from "next/link";
import { BarChart3, Home } from "lucide-react";

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
      <body className="antialiased">
        <ReactQueryProvider>
          {/* Navigation Header */}
          <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Sales Analytics
                  </span>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
