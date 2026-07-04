import "./globals.css";
import { Space_Grotesk, Sora, Kaushan_Script } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sora",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kaushan",
  display: "swap",
});

export const metadata = {
  title: "Hashir Muhiyudheen K | Full-Stack Developer Portfolio",
  description: "Explore the portfolio of Hashir Muhiyudheen K, featuring full-stack projects, creative designs, and interactive web applications including KTU PrepHub, Mandhi Resto, and more.",
  keywords: ["Hashir Muhiyudheen K", "KTU PrepHub", "Mandhi Restaurant", "KTU Canteen Menu", "Full-Stack Developer", "Software Engineer Portfolio"],
  authors: [{ name: "Hashir Muhiyudheen K" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} ${kaushanScript.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
