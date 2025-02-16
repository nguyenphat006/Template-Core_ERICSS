import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { isAdmin } = useAuth()
  const router = useRouter()

  if (!isAdmin) {
    router.push('/') // Nếu không phải Admin, chuyển về trang chính
    return null
  }

  return <h1>Dashboard Admin</h1>
}
