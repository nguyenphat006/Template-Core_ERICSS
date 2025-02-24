'use client'

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils' // Nếu bạn đang dùng cn()
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LoginSchema } from '../schema/index'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' }
  })

  // Submit form
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true)
    console.log(data)
    // Giả lập login thành công
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard') // Redirect sau khi login
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6">
          {/* Input Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="m@example.com" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Input Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/admin/forgot-password" className="text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>

          {/* Hoặc login bằng Google */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <Image src="/iconSvg/google.svg" alt="Google" width={20} height={20} />
            Login with Google
          </Button>
        </div>

        {/* Link đến trang đăng ký */}
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/admin/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </form>
    </Form>
  )
}
