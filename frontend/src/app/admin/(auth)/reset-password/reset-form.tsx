'use client'

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { resetPasswordSchema } from '../schema/index'
import Link from 'next/link'

export function ResetForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // React Hook Form + Zod
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  // Submit form
  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true)
    console.log(data)
    // Giả lập reset mật khẩu thành công
    setTimeout(() => {
      setLoading(false)
      alert('Mật khẩu đã được đặt lại thành công!')
      router.push('/admin/login') // Redirect sau khi reset mật khẩu
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6">
          {/* Input Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>

        {/* Link quay về đăng nhập */}
        <div className="text-center text-sm">
          Remembered your password?{' '}
          <Link href="/admin/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
