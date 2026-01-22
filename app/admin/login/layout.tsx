import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Admin",
  robots: "noindex, nofollow",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {children}
    </div>
  );
}
