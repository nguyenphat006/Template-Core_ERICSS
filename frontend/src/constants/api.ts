// FIle này sử dụng mục đích để lưu trữ các đường dẫn URL của API


// src/constants/api.ts

export const API_ENDPOINTS = {
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  
    CART: '/cart',
    ADD_TO_CART: '/cart/add',
    REMOVE_FROM_CART: (id: string) => `/cart/remove/${id}`,
  
    CHECKOUT: '/checkout',
    ORDER_HISTORY: '/orders',
    ORDER_DETAIL: (id: string) => `/orders/${id}`,
  
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  
    UPLOAD_IMAGE: '/media/upload',
  };
  