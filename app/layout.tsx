import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elite-capital-one.vercel.app"),
  title: "Elite Capital | Microcredito empresarial",
  description:
    "Credito para empresas com CNPJ ativo, ponto fisico e entrada de caixa recorrente.",
  icons: {
    icon: "/brand/elite-capital-logo-color.png",
    shortcut: "/brand/elite-capital-logo-color.png",
  },
  openGraph: {
    title: "Elite Capital | Credito para empresas que vendem todos os dias",
    description:
      "Microcredito empresarial com pagamento diario e cadastro sujeito a analise.",
    images: ["/brand/elite-capital-logo-color.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
