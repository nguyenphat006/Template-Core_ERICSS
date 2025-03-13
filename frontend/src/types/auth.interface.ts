interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  interface LoginParams {
    email: string;
    password: string;
  }
  
  interface RegisterParams {
    email: string;
    fullname: string;
    password: string;
    confirmPassword: string;
  }
  
  interface ForgotPasswordParams {
    email: string;
  }
  
  interface ResetPasswordParams {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  interface VerifyParams {
    email: string;
    otp: string;
  }
  
  interface ResendOtpParams {
    email: string;
  }
  
