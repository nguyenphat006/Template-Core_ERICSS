import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  name: z.string().min(1, {
    message: 'Please enter your name'
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password:
    z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
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
    password: 
    z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' })
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })