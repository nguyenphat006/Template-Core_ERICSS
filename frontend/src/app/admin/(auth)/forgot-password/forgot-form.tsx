'use client'

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import { ForgotPasswordSchema } from '../schema/index'



export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' }
  })

  // Submit form
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setLoading(true)
    console.log(data)
    // Giả lập gửi email đặt lại mật khẩu
    setTimeout(() => {
      setLoading(false)
      alert('Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.')
      router.push('/signin') // Redirect sau khi gửi email
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password?</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below and we&apos;ll send you a link to reset your password.
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

          {/* Button Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>

        {/* Link về trang đăng nhập */}
        <div className="text-center text-sm">
          Remembered your password?{' '}
          <Link href="/admin/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
