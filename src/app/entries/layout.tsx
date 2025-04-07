// src/app/entries/layout.tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}