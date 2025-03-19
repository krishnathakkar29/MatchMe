import TopNav from "@/components/navbar/top-nav";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
}
