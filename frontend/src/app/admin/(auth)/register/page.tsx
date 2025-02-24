import AuthLayout from "@/app/admin/(auth)/components/layout"
import { RegisterForm } from "./register-form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
