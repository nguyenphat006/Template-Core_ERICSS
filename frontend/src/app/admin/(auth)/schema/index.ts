import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    name: z.string().min(1, {
        message: "Please enter your name"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
});
export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    })
});
// Schema validation với Zod (OTP chỉ gồm 6 số)
export const otpSchema = z.object({
    otp: z.string().length(6, { message: 'OTP phải gồm 6 chữ số' }).regex(/^\d+$/, { message: 'Chỉ được nhập số' })
  })

// Schema validation với Zod
export const resetPasswordSchema = z.object({
    password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu xác nhận ít nhất 6 ký tự' })
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })