'use client'

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
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
import { RegisterSchema } from '../schema/index';

// Schema validation với Zod
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Tên ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Mật khẩu xác nhận ít nhất 6 ký tự' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword']
})

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  // Submit form
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true)
    console.log(data)
    // Giả lập đăng ký thành công
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard') // Redirect sau khi đăng ký
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your information below to register your account
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6">
          {/* Input Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Input Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
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

        {/* Link đến trang đăng nhập */}
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/admin/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
