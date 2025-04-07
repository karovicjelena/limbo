// src/app/new/layout.tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function NewEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}