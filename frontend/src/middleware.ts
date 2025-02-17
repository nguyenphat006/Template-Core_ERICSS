// import { NextRequest, NextResponse } from 'next/server'

// export function middleware(req: NextRequest) {
//   const isAdmin = req.cookies.get('role')?.value === 'admin'

//   // Nếu user không phải Admin, redirect về trang chính
//   if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
//     return NextResponse.redirect(new URL('/', req.url))
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*'], // Middleware chỉ áp dụng cho đường dẫn /admin/*
// }


import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get('role')?.value === 'admin'

  // Thiết lập cookie role=admin nếu chưa có
  if (!req.cookies.get('role')) {
    const response = NextResponse.next()
    response.cookies.set('role', 'admin', { path: '/' })
    return response
  }

  // Nếu user không phải Admin, redirect về trang chính
  if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Middleware chỉ áp dụng cho đường dẫn /admin/*
}