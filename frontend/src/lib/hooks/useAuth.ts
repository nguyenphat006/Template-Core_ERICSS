import { useEffect, useState } from 'react'

export function useAuth() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const userRole = document.cookie.split('; ').find(row => row.startsWith('role='))?.split('=')[1]
    setRole(userRole || 'user') // Mặc định là 'user'
  }, [])

  return { role, isAdmin: role === 'admin' }
}
