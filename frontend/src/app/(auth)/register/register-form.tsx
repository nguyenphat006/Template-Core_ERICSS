'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { RegisterSchema } from '../schema/index';
import { useRegister } from './useRegister'

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { loading, onSubmit } = useRegister()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Đăng ký tài khoản</h1>
          <p className="text-balance text-md text-muted-foreground">
            Nhập thông tin của bạn bên dưới để đăng ký tài khoản
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
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nguyễn Văn A" />
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
                <FormLabel>Mật khẩu</FormLabel>
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
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage /> {/* Hiển thị lỗi nếu có */}
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button size="xl" type="submit" className="w-full bg-[#6366f1] hover:bg-[#5044ee]" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </Button>

          {/* Hoặc login bằng Google */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <Image src="/iconSvg/google.svg" alt="Google" width={20} height={20} />
            Đăng nhập với Google
          </Button>
        </div>

        {/* Link đến trang đăng nhập */}
        <div className="text-center text-sm">
          Đã có tài khoản?{' '}
          <Link href="/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  )
}
