'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { LoginSchema } from '../schema/index'
import { useLogin } from './useLogin'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { onSubmit, loading } = useLogin()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold dark:text-black">Chào mừng quay trở lại</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Nhập email và mật khẩu của bạn để đăng nhập vào tài khoản của bạn.
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
                <FormLabel className="dark:text-black">Email</FormLabel>
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
                  <FormLabel className="dark:text-black">Mật khẩu</FormLabel>
                  <Link href="/admin/forgot-password" className="text-sm underline-offset-4 hover:underline">
                    Quên mật khẩu?
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
          <Button type="submit" className="w-full dark:bg-black" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>

          {/* Hoặc login bằng Google */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <Image src="/iconSvg/google.svg" alt="Google" width={20} height={20} />
            Đăng nhập bằng google
          </Button>
        </div>

        {/* Link đến trang đăng ký */}
        <div className="text-center text-sm">
          {/* Don&apos;t have an account?{' '} */}Chưa có tài khoản?{' '}
          <Link href="/admin/register" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Đăng ký tại đây
          </Link>
        </div>
      </form>
    </Form>
  )
}
