'use client'
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
import { useForgotPassword } from './useForgot'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { loading, onSubmit } = useForgotPassword()
  const router = useRouter()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Quên mật khẩu?</h1>
          <p className="text-balance text-md text-muted-foreground">
            Nhập email của bạn bên dưới và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
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
          <Button size="xl" type="submit" className="w-full bg-[#6366f1] hover:bg-[#5044ee]" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Xác nhận'}
          </Button>
        </div>

        {/* Link về trang đăng nhập */}
        <div className="text-center text-sm">
          Đã nhớ mật khẩu?{' '}
          <Link href="/admin/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  )
}
