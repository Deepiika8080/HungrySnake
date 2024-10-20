import type { Metadata } from "next";
import  "../css/style.css";

export const metadata: Metadata = {
  title: "Hungry Snake",
  description: "for snake lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="body"
      >
        {children}
      </body>
    </html>
  );
}
