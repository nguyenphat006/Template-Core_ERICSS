import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  
  // Định nghĩa URL gốc cho API, lấy từ biến môi trường
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  
  // Biến để theo dõi xem có đang trong quá trình refresh token không
  let isRefreshing = false;
  
  // Promise dùng để giữ quá trình refresh hiện tại
  let refreshPromise: Promise<any> | null = null;
  
  //
  // ==================== PUBLIC AXIOS (Không cần token) ====================
  //
  export const publicAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Gửi kèm cookie nếu có
  });
  
  //
  // ==================== REFRESH AXIOS (Dùng riêng để refresh token) ====================
  // Không dùng interceptor, tránh vòng lặp vô hạn khi bị lỗi
  //
  const refreshAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  //
  // ==================== PRIVATE AXIOS (Dùng cho API cần xác thực) ====================
  // Có interceptor để tự động gắn token vào header
  //
  export const privateAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  //
  // === Interceptor request: tự động gắn Bearer token vào header ===
  //
  privateAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Chỉ chạy ở client-side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`; // Gắn vào Authorization header
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  //
  // === Hàm retry request sau khi đã refresh token thành công ===
  //
  const retryRequest = (originalConfig: AxiosRequestConfig): Promise<any> => {
    const newToken = localStorage.getItem('token'); // Lấy token mới từ localStorage
  
    // Nếu không có token mới, redirect về login
    if (!newToken) {
      window.location.href = '/login';
      return new Promise(() => {}); // "kill" promise
    }
  
    // Gắn lại token mới vào request cũ
    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${newToken}`,
    };
  
    // Gửi lại request với config gốc
    return privateAxios(originalConfig);
  };
  
  //
  // === Interceptor response: xử lý lỗi và refresh token khi bị 401 / 403 ===
  //
  privateAxios.interceptors.response.use(
    // Nếu response thành công → trả về như bình thường
    (response: AxiosResponse) => response,
  
    // Nếu response lỗi
    async (error: AxiosError) => {
      const originalConfig = error.config;
  
      // Nếu không có phản hồi từ server (lỗi mạng...)
      if (!error.response) {
        console.error('Server not responding:', error.message);
        return Promise.reject(error);
      }
  
      const status = error.response.status;
  
      // Nếu lỗi là 401 hoặc 403 và chưa retry lần nào
      if ((status === 401 || status === 403) && !originalConfig._retry) {
        originalConfig._retry = true; // Đánh dấu là đã thử refresh
  
        // Nếu đang trong quá trình refresh → chờ promise đó
        if (isRefreshing) {
          try {
            await refreshPromise;
            return retryRequest(originalConfig); // Sau khi refresh xong thì retry
          } catch (e) {
            window.location.href = '/login'; // Nếu refresh thất bại
            return new Promise(() => {});
          }
        }
  
        // Nếu chưa refresh → bắt đầu refresh
        try {
          isRefreshing = true;
  
          // Gọi API refresh token
          refreshPromise = refreshAxios.post('/auth/refresh-token');
          const response = await refreshPromise;
  
          const newToken = response.data?.token;
          if (newToken) {
            localStorage.setItem('token', newToken); // Lưu token mới vào localStorage
          }
  
          return retryRequest(originalConfig); // Retry lại request cũ
        } catch (refreshErr) {
          console.warn('Refresh token failed', refreshErr);
          localStorage.removeItem('token'); // Xoá token cũ
          window.location.href = '/login'; // Chuyển về trang đăng nhập
          return new Promise(() => {});
        } finally {
          // Reset trạng thái refresh
          isRefreshing = false;
          refreshPromise = null;
        }
      }
  
      // Các lỗi khác không phải 401/403 thì reject như bình thường
      return Promise.reject(error);
    }
  );
  