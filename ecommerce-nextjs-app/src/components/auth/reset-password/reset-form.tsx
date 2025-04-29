'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useReset } from './useReset'

export function ResetForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  // React Hook Form + Zod
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  const { loading, onSubmit } = useReset()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Đặt lại mật khẩu</h1>
          <p className="text-balance text-md text-muted-foreground">
            Nhập mật khẩu mới của bạn bên dưới.
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
                <FormLabel>Mật khẩu mới</FormLabel>
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
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button size="xl" type="submit" className="w-full bg-[#6366f1] hover:bg-[#5044ee]" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </Button>
        </div>

        {/* Link quay về đăng nhập */}
        <div className="text-center text-sm">
          Nhớ mật khẩu?{' '}
          <Link href="/sign-in" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  )
}
