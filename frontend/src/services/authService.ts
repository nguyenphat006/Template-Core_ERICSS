import { fetcher } from "@/lib/fetcher";




export const signIn = async (credentials: any) => {
    const response = await fetcher("/auth/login", { // chưa có signIn
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    localStorage.setItem('token', response.token)
    return response;
  };
  
  export const signUp = async (credentials: any) => { // chưa có signUp
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const resetPassword = async (credentials: any) => {  // chưa có resetPassword
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const forgotPassword = async (credentials: any) => { // chưa có forgotPassword
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const verifyOtpEmail = async (credentials: any) => { // chưa có verifyOtp
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const resendVerificationEmail = async (credentials: any) => { // chưa có resendVerificationCode
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const verifyOtpCode = async (credentials: any) => { // chưa có verifyOtp
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
  
  export const resendVerificationCode = async (credentials: any) => { // chưa có resendVerificationCode
    const response = await fetcher("/users/", {
      method: "POST",
      body: JSON.stringify(credentials),
    }, true);
  
    return response;
  };
