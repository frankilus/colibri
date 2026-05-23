export const metadata = {
  robots: { index: false, follow: false },
};

export default function PublicAdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
