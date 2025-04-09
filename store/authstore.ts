// AuthStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { 
  loginUser, 
  logoutUser as apiLogout, 
  registerUser, 
  verifyEmail,
  RegistrationData,
  EmailVerificationData,
  AuthTokens
} from "@/services/auth.service";
import { getCustomer } from "@/services/customer.service";
import { getAccessToken } from "@/utils/tokenStorage";
import { ApiResponse } from "../services/test/api.test";

interface Customer {
  userId: number;
  customerId: string;
  firstName: string;
  lastName: string;
  isEmailVerified: number;
  isActive: number;
  countryOfResidence: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  customer: Customer | null;

  registrationEmail: string | null;
  setRegistrationEmail: (email: string) => void;
  loggedInEmail: string | null;

  registrationLoading: boolean;
  registrationError: string | null;
  verificationLoading: boolean;
  verificationError: string | null;
  
  // Fixed return types to match actual implementation
  login: (emailAddress: string, password: string) => Promise<ApiResponse<AuthTokens>>;
  register: (userData: RegistrationData) => Promise<ApiResponse<AuthTokens>>;
  verifyUserEmail: (data: EmailVerificationData) => Promise<ApiResponse<{ verified: boolean }>>;
  logout: () => void;
  checkAuth: () => boolean;
  fetchCustomerData: (emailAddress: string) => Promise<Customer>;
  clearErrors: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: typeof window !== 'undefined' && !!getAccessToken(),
      error: null,
      loading: false,
      customer: null,

      registrationLoading: false,
      registrationError: null,
      verificationLoading: false,
      verificationError: null,

      registrationEmail: null,
      loggedInEmail: null,

      setRegistrationEmail: (email) => {
        set({ registrationEmail: email });
      },

      clearErrors: () => {
        set({ 
          error: null, 
          registrationError: null, 
          verificationError: null 
        });
      },

      fetchCustomerData: async (emailAddress) => {
        try {
          set({ loading: true });
          const response = await getCustomer(emailAddress);
          const customerData = response.data;
          set({ customer: customerData, loading: false });
          return customerData;
        } catch (error) {
          set({ 
            error: "Failed to fetch customer data", 
            loading: false 
          });
          throw error;
        }
      },

      login: async (emailAddress, password) => {
        set({ loading: true, error: null });
        try {
          const response = await loginUser({ emailAddress, password });
          set({ 
            isAuthenticated: true, 
            loading: false, 
            loggedInEmail: emailAddress 
          });
          return response; // Return the entire response
        } catch (error) {
          set({ 
            error:  "Login faled", 
            loading: false 
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ registrationLoading: true, registrationError: null });
        try {
          const response = await registerUser(userData);
          set({ 
            registrationLoading: false,
            registrationEmail: userData.emailAddress
          });
          return response; // Return the entire response
        } catch (error) {
          set({ 
            registrationError:  "Registration failed", 
            registrationLoading: false 
          });
          throw error;
        }
      },

      verifyUserEmail: async (data) => {
        set({ verificationLoading: true, verificationError: null });
        try {
          const response = await verifyEmail(data);
          set({ verificationLoading: false });
          return response; // Return the entire response
        } catch (error) {
          set({ 
            verificationError:  "Email verification failed", 
            verificationLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        apiLogout();
        set({ 
          isAuthenticated: false,
          customer: null,
          loggedInEmail: null
        });
      },

      checkAuth: () => {
        const token = getAccessToken();
        const isAuthenticated = !!token;
        set({ isAuthenticated });
        return isAuthenticated;
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);