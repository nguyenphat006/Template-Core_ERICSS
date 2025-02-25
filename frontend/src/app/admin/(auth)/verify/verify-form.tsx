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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { otpSchema } from '../schema/index'


export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' }
  })

  // Submit form
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    setLoading(true)
    console.log(data)
    // Giả lập xác thực OTP thành công
    setTimeout(() => {
      setLoading(false)
      router.push('/admin/reset-password') // Redirect sau khi xác thực
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter Verification Code</h1>
          <p className="text-balance text-sm text-muted-foreground">
            We have sent a 6-digit OTP to your email. Please enter it below.
          </p>
        </div>

        {/* Input OTP */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage /> {/* Hiển thị lỗi nếu có */}
            </FormItem>
          )}
        />

        {/* Button Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        {/* Link để gửi lại OTP */}
        <div className="text-center text-sm">
          Didn't receive the code?{' '}
          <button type="button" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Resend OTP
          </button>
        </div>
      </form>
    </Form>
  )
}
