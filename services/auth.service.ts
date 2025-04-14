// auth.service.ts
import api from "./api"; // Import the main api file, not test/api.test
import { setAccessToken, setRefreshToken, removeTokens } from "@/utils/tokenStorage";
import { ApiError } from "./api"; // Import the standard error type

// Authentication response types
export interface AuthTokens {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  data: AuthTokens;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  countryOfResidence: string;
}

export interface EmailVerificationData {
  emailAddress: string;
  otp: string;
}

// Standard error handler for API responses
const handleApiError = (error: any): never => {
  // If it's already our standard ApiError type, just throw it
  if ('message' in error && 'statusCode' in error) {
    throw error;
  }
  
  // Otherwise, create a standardized error
  let errorMessage = "An unexpected error occurred";
  
  if (typeof error === 'object' && error !== null) {
    if ('detail' in error) {
      errorMessage = String(error.detail);
    } else if ('message' in error) {
      errorMessage = String(error.message);
    }
  }
  
  throw {
    message: errorMessage,
    statusCode: 500
  } as ApiError;
};

export const registerUser = async (data: RegistrationData) => {
  try {
    const response = await api.post<AuthTokens>("/onboarding", data);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const verifyEmail = async (data: EmailVerificationData) => {
  try {
    const response = await api.post<{ verified: boolean }>("/onboarding/verify-email", data);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (data: {
  emailAddress: string;
  password: string;
}) => {
  try {
    const response = await api.post<AuthTokens>("/onboarding/login", data);
    const tokens = response.data;
    
    // Store both tokens
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const logoutUser = () => {
  removeTokens();
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post<AuthTokens>("/auth/refresh-token", { refreshToken });
    const tokens = response.data;
    
    // Update stored tokens
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};