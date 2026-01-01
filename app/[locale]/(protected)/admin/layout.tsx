import { auth } from "@/lib/auth"
import AdminLayout from "@/components/adminPage/AdminLayout"

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    // Render children without layout for unauthenticated users (login page)
    return <>{children}</>
  }

  // For authenticated users, wrap in AdminLayout
  return <AdminLayout user={session.user}>{children}</AdminLayout>
}
