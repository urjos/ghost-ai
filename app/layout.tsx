import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
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
  title: "Ghost AI",
  description: "Real-time collaborative system design workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "var(--accent-primary)",
          colorPrimaryForeground: "var(--bg-base)",
          colorBackground: "var(--bg-surface)",
          colorForeground: "var(--text-primary)",
          colorMuted: "var(--bg-subtle)",
          colorMutedForeground: "var(--text-muted)",
          colorInput: "var(--bg-elevated)",
          colorInputForeground: "var(--text-primary)",
          colorNeutral: "var(--border-subtle)",
          colorBorder: "var(--border-default)",
          colorRing: "var(--accent-primary)",
          colorDanger: "var(--state-error)",
          colorSuccess: "var(--state-success)",
          colorWarning: "var(--state-warning)",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-sans)",
        },
        elements: {
          card: "border border-surface-border bg-surface shadow-2xl rounded-2xl",
          headerTitle: "font-heading text-xl font-bold text-copy-primary",
          headerSubtitle: "text-copy-muted text-sm",
          socialButtonsBlockButton: "border border-surface-border bg-elevated hover:bg-subtle text-copy-primary rounded-xl",
          formFieldInput: "border border-surface-border bg-elevated text-copy-primary rounded-xl focus:border-brand",
          formButtonPrimary: "bg-brand text-base hover:opacity-90 font-semibold rounded-xl text-[#080809]",
          footerActionLink: "text-brand hover:underline font-medium",
        },
      }}
    >
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      >
        <body suppressHydrationWarning className="min-h-full flex flex-col bg-base text-copy-primary">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
