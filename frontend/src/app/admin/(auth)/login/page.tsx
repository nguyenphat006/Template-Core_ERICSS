import AuthLayout from "@/app/admin/(auth)/components/layout"
import { LoginForm } from "@/app/admin/(auth)/login/login-form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
