import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const FamiljenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-famijen-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Events App",
  description: "Your event management application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <html lang="en">
      <body className={`${FamiljenGrotesk.variable} antialiased bg-blue-950 text-white min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-b from-blue-900/50 via-blue-950/80 to-blue-950">
          <div 
            className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-950/40 to-blue-950/80 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative max-w-[1200px] mx-auto px-4 py-6">
            <Header user={user} />
            <main className="mt-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}