// // auth.service.ts
// import api from "./test/api.test";
// import { setAccessToken, setRefreshToken, removeAccessToken, removeTokens } from "@/utils/tokenStorage";
// import axios from "axios";


// interface LoginResponse {
//   status: boolean;
//   message: string;
//   data: {
//     tokenType: string;
//     accessToken: string;
//     refreshToken: string;
//   };
// }


// interface ErrorResponse {
//   detail?: string;
//   message?: string;
//   errors?: any[];
// }



// export const registerUser = async (data: {
//   firstName: string
//   lastName: string
//   emailAddress: string
//   password: string
//   phoneNumber: string
//   countryOfResidence: string
// }
// ) => {
//   try {
//     const response = await api.post("/onboarding", data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response?.data) {
//       const errorData = error.response.data as ErrorResponse;

//       // Handle different error formats
//       if (errorData.detail) {
//         // If detail is an array, extract the first error object
//         if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
//           const firstError = errorData.detail[0];
//           if (typeof firstError === 'object' && firstError !== null) {
//             // Try to find a message property (common fields in validation errors)
//             const errorMessage = 
//               firstError.msg || 
//               firstError.message || 
//               firstError.error || 
//               firstError.description || 
//               JSON.stringify(firstError);
              
//             throw { detail: errorMessage };
//           } else {
//             throw { detail: String(firstError) };
//           }
//         } else {
//           throw { detail: String(errorData.detail) };
//         }
//       } else if (errorData.message) {
//         throw { detail: errorData.message };
//       } else if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
//         throw { detail: errorData.errors[0].msg || "Registration validation error" };
//       } else {
//         throw { detail: "Registration failed with status: " + error.response.status };
//       }
//     }

//     throw { detail: "Network error occurred. Please check your connection and try again." };
//   }
// };



// // /onboarding/verify-email
// export const verifyEmail = async (data: {
//   emailAddress: string
//   otp: string
// }) => {
//   try {
//     const response = await api.post("/onboarding/verify-email", data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response?.data) {
//       const errorData = error.response.data as ErrorResponse;
//       console.error("API Error Response:", errorData);

//       // Handle different error formats
//       if (errorData.detail) {
//         throw { detail: errorData.detail };
//       } else if (errorData.message) {
//         throw { detail: errorData.message };
//       } else if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
//         throw { detail: errorData.errors[0].msg || "Email verification error" };
//       } else {
//         throw { detail: "Email verification failed with status: " + error.response.status };
//       }
//     }

//     console.error("Network or other error:", error);
//     throw { detail: "Network error occurred. Please check your connection and try again." };
//   }
// };


// // Login User
// export const loginUser = async (data: {
//   emailAddress: string;
//   password: string;
// }) => {
//   try {
//     const response = await api.post("/onboarding/login", data);
//     const { tokenType, accessToken, refreshToken } = response.data.data;

//     // Store both tokens
//     setAccessToken(accessToken);
//     setRefreshToken(refreshToken);

//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response?.data) {
//       const errorData = error.response.data as ErrorResponse;
//       console.error("API Error Response:", errorData);

//       // Handle different error formats
//       if (errorData.detail) {
//         throw { detail: errorData.detail };
//       } else if (errorData.message) {
//         throw { detail: errorData.message };
//       } else if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
//         throw { detail: errorData.errors[0].msg || "Validation error" };
//       } else {
//         throw { detail: "Login failed with status: " + error.response.status };
//       }
//     }

//     console.error("Network or other error:", error);
//     throw { detail: "Network error occurred. Please check your connection and try again." };
//   }
// };




// export const logoutUser = () => {
//   removeTokens();
// };



// auth.service.ts
import api from "./test/api.test"; // Import the main api file, not test/api.test
import { setAccessToken, setRefreshToken, removeTokens } from "@/utils/tokenStorage";
import { ApiError } from "./test/api.test"; // Import the standard error type

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