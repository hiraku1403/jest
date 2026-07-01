import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasks — Lista de Tarefas",
  description: "App de tarefas com Next.js 15, TypeScript e testes com Jest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
