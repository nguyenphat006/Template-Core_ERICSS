// File này mục đích cấu hình các đường dẫn URL Router cho FE sử dụng chung

// src/constants/routes.ts

export const ROUTES = {
    HOME: '/',
    SHOP: '/shop',
    PRODUCTS: '/shop/products',
    PRODUCT_DETAIL: (slug: string) => `/shop/products/${slug}`,
  
    CART: '/cart',
    CHECKOUT: '/checkout',
    THANK_YOU: '/checkout/success',
  
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  
    ACCOUNT: '/account',
    ACCOUNT_ORDERS: '/account/orders',
    ACCOUNT_SETTINGS: '/account/settings',
  
    ADMIN: '/admin',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_PRODUCTS: '/admin/products',
  };
  